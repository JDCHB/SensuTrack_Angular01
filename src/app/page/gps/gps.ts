import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//MAPA
import * as L from 'leaflet';
import 'leaflet-draw';

//SWEET ALERT
import Swal from 'sweetalert2';

//COMPONENTES
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Footer } from '../../components/footer/footer';

//SERVICIO
import { DiscapacitadoService } from '../../services/discapacitado.service';


@Component({
  selector: 'app-gps',
  imports: [
    NavbarUsuario, Footer,
    CommonModule],
  templateUrl: './gps.html',
  styleUrl: './gps.css'
})
export class GPS implements OnInit {
  map!: L.Map;
  drawControl!: L.Control.Draw;
  drawnItems: L.FeatureGroup = L.featureGroup();
  ciegos: any[] = [];
  zonas_Seguras: any[] = [];
  error: string | null = null;
  modoAgregarZona = false;
  loading = true;
  v_estado = true;

  constructor(private discapacitadoService: DiscapacitadoService) { }

  //TOMAR DATOS DEL LOCALSTORAGE
  ngOnInit(): void {
    this.initMap();
    const userData = this.getUserData();
    console.log('🧑 Datos del usuario:', userData);
  }

  //TOMAR EL ID DEL USUARIO PARA IDENTIFICARLE
  getUserData(): any {
    try {
      const userData = localStorage.getItem("user_data");
      return userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error("Error al leer user_data:", e);
      return null;
    }
  }

  //POR MEDIO DEL ID QUE SACAMOS DEL LOCALSTORAGE BUSCAMOS A LOS DISCAPACITADOS REGISTRADOS POR EL USUARIO
  cargarDiscapacitado() {
    const userData = this.getUserData();
    if (!userData?.id) {
      this.error = 'No se encontraron datos de usuario válidos';
      return;
    }

    const ID_USUARIO = { user_id: userData.id }; // <-- Aquí está la corrección

    this.discapacitadoService.Discapacitado_Mapa(ID_USUARIO).subscribe({
      next: async (response) => {
        this.ciegos = response.resultado || [];
        this.loading = false;
        console.log('Datos cargados:', response.resultado);

        // Mostrar ubicaciones
        this.mostrarUbicaciones();

        // Cargar zona segura del primer discapacitado
        if (this.ciegos.length > 0) {
          await this.cargarZonaSegura(this.ciegos[0].id);
        }
      },
      error: (err) => {
        console.error('Error en cargarDiscapacitado:', err);
        this.error = err.error?.detail || 'Error al cargar datos';
        this.loading = false;
        alert("Error al cargar datos: " + this.error);
      }
    })
  }

  //LUEGO AL OBTENER AL DISCAPACITADO VISUAL TOMAMOS SUS DATOS
  mostrarUbicaciones() {
    if (!this.map) return;

    // Limpiar marcadores y círculos existentes
    if (this.drawnItems) {
      this.drawnItems.clearLayers();
    } else {
      this.drawnItems = L.featureGroup();
      this.map.addLayer(this.drawnItems);
    }

    this.ciegos.forEach((discapacitado: any, index: number) => {
      const {
        nombre_discapacitado,
        latitud,
        longitud,
        numero_serie,
        nivel_bateria,
      } = discapacitado;

      // Crear marcador
      const marker = L.marker([latitud, longitud]);
      marker.bindPopup(`
      <b>${nombre_discapacitado}</b><br>
      Latitud: ${latitud}, Longitud: ${longitud}<br>
      GPS: ${numero_serie}<br>
      Nivel de Batería: ${nivel_bateria}%
    `);
      this.drawnItems.addLayer(marker);

      // Crear círculo
      const circle = L.circle([latitud, longitud], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100,
      });

      circle.bindPopup(`${nombre_discapacitado} se encuentra en esta área.`);

      circle.on('click', (e: any) => {
        if (!(circle as any)._editable) {
          e.target.closePopup();
          e.originalEvent.stopPropagation();
        }
      });

      (circle as any)._editable = false;
      this.drawnItems.addLayer(circle);

      // Centrar el mapa en el primer discapacitado
      if (index === 0) {
        this.map.setView([latitud, longitud], 15);
      }
    });
  }

  //ZONAS SEGURAS POR DISCAPACITADO
  async cargarZonaSegura(idDiscapacitado: number) {
    if (!idDiscapacitado) return;

    this.discapacitadoService.getZonaSeguraPorDiscapacitado(idDiscapacitado).subscribe({
      next: (data: any[]) => {
        if (Array.isArray(data)) {
          data.forEach((zona) => {
            const { nombre_zona, latitud, longitud, radio } = zona;

            const circle = L.circle([parseFloat(latitud), parseFloat(longitud)], {
              color: 'green',
              fillColor: '#7CFC00',
              fillOpacity: 0.4,
              radius: parseFloat(radio),
            });

            (circle as any)._idZona = zona.id;
            (circle as any)._editable = true;

            this.drawnItems.addLayer(circle);
            circle.bindPopup(
              `Zona Segura: <b>${nombre_zona}</b><br>Radio: <b>${radio} metros</b>`
            );
          });
        }
      },
      error: (error) => {
        console.error('Error al cargar la zona segura:', error);
      },
    });
  }

  //INICIALIZAMOS EL MAPA
  initMap(): void {
    try {
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        throw new Error('Elemento del mapa no encontrado');
      }

      // Inicializar el mapa
      this.map = L.map(mapElement).setView([10.9639, -74.7964], 13);

      // Cargar capa de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      // Añadir grupo de capas dibujadas
      this.drawnItems = new L.FeatureGroup();
      this.map.addLayer(this.drawnItems);

      // Crear controles de dibujo
      this.drawControl = new L.Control.Draw({
        draw: {
          polygon: false,
          polyline: false,
          rectangle: false,
          marker: false,
          circlemarker: false,
          circle: {
            shapeOptions: {
              color: 'green',
              fillColor: '#7CFC00',
              fillOpacity: 0.4
            }
          }
        },
        edit: {
          featureGroup: this.drawnItems
        }
      });

      this.map.addControl(this.drawControl);

      // Configurar eventos del mapa
      this.configurarEventosMapa();

      // Cargar discapacitados asociados al usuario
      this.cargarDiscapacitado();

    } catch (e: any) {
      console.error('Error al inicializar el mapa:', e);
      this.error = e.message;
      this.loading = false;
    }
  }

  configurarEventosMapa() {
    if (!this.map) return;

    this.map.on("draw:created", async (event) => {
      if (!this.modoAgregarZona) {
        this.map.removeLayer(event.layer);
        return;
      }

      const layer = event.layer;
      const center = layer.getLatLng();

      try {
        const { value: nombreZona } = await Swal.fire({
          title: "Nombre de la Zona Segura",
          input: "text",
          inputLabel: "Ingresa el nombre de esta zona",
          inputPlaceholder: "Ej: Zona Norte, Patio Principal...",
          showCancelButton: true,
          confirmButtonText: "Guardar",
        });

        if (!nombreZona) {
          this.map.removeLayer(layer);
          return;
        }

        const idDiscapacitado = this.ciegos.length > 0 ? this.ciegos[0].id : null;

        if (!idDiscapacitado) {
          throw new Error(
            "No se encontró un ID de discapacitado válido",
          );
        }

        const zonaSegura = {
          nombre_zona: nombreZona,
          latitud: String(center.lat),
          longitud: String(center.lng),
          radio: layer.getRadius?.() || 100,
          id_discapacitado: idDiscapacitado,
          estado: this.v_estado,
        };

        this.discapacitadoService.createZonaSegura(zonaSegura).subscribe({
          next: (result) => {
            layer._idZona = result.id;
            this.drawnItems.addLayer(layer);
            layer
              .bindPopup(`Zona Segura: <b>${nombreZona}</b>`)
              .openPopup();

            Swal.fire({
              title: "¡Guardado!",
              text: "Zona segura registrada exitosamente",
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              location.reload();
            });
          },
          error: (error) => {
            console.error("Error al crear zona segura:", error);
            this.map.removeLayer(layer);
            Swal.fire("Error", error.error.detail || "Error al guardar", "error");
          },
        });
      } catch (e: any) {
        console.error("Error al crear zona segura:", e);
        this.map.removeLayer(layer);
        Swal.fire("Error", e.message, "error");
      }
    });

    this.map.on("draw:deleted", async (event: any) => {
      const layers = event.layers;
      layers.eachLayer(async (layer: any) => {
        if (!layer._editable) {
          this.drawnItems.addLayer(layer); // 🚫 Evitar eliminar si no es editable
          return;
        }

        try {
          const idZonaSegura = layer._idZona;
          if (!idZonaSegura) return;

          this.discapacitadoService.deleteZonaSegura(idZonaSegura).subscribe({
            next: () => {
              Swal.fire({
                title: "Eliminado!",
                text: "Zona segura eliminada exitosamente",
                icon: "success",
                timer: 3000, // la alerta se cierra automáticamente después de 2 segundos
                showConfirmButton: false,
              }).then(() => {
                location.reload();
              });
            },
            error: (error) => {
              console.error("Error al eliminar zona:", error);
              Swal.fire("Error", "No se pudo eliminar la zona", "error");
            },
          });
        } catch (e: any) {
          console.error("Error al eliminar zona:", e);
          Swal.fire("Error", e.message, "error");
        }
      });
    });

    this.map.on("draw:edited", async (event: any) => {
      const layers = event.layers;
      layers.eachLayer(async (layer: any) => {
        if (!layer._editable) return;

        try {
          const idZonaSegura = layer._idZona;
          if (!idZonaSegura) return;

          const { value: nuevoNombre } = await Swal.fire({
            title: "Editar nombre de la zona",
            input: "text",
            inputPlaceholder: "Ej: Zona Escuela",
            showCancelButton: true,
            inputValidator: (value) => value ? null : "Debes escribir un nombre.",
          });

          if (!nuevoNombre) return;

          const center = layer.getLatLng();
          const zonaData = {
            latitud: String(center.lat),
            longitud: String(center.lng),
            radio: layer.getRadius?.() || 100,
            nombre_zona: nuevoNombre,
          };

          this.discapacitadoService.updateZonaSegura(idZonaSegura, zonaData).subscribe({
            next: () => {
              Swal.fire({
                title: "Editado!",
                text: "Zona segura editada exitosamente",
                icon: "success",
                timer: 3000, // la alerta se cierra automáticamente después de 2 segundos
                showConfirmButton: false,
              }).then(() => {
                location.reload();
              });
            },
            error: (e: any) => {
              console.error("Error al eliminar zona:", e);
              Swal.fire("Error", e.message, "error");
            },
          });
        } catch (e: any) {
          console.error("Error al editar zona:", e);
          Swal.fire("Error", e.message, "error");
        }
      });
    })
  }

  toggleAgregarZona() {
    if (!this.map) return;

    this.modoAgregarZona = !this.modoAgregarZona;
    if (this.modoAgregarZona) {
      this.map.addControl(this.drawControl);
    } else {
      this.map.removeControl(this.drawControl);
    }
  }
}
