import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiscapacitadoService } from '../../../services/discapacitado.service';
import { SafeUrlPipe } from '../../../services/safe-url-reporte.pipe';

@Component({
  selector: 'app-reportes',
  imports: [FormsModule, SafeUrlPipe, CommonModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportes {
  todos: any[] = [];
  loading = false;
  error: string | null = null;
  fecha_de = '';
  fecha_hasta = '';
  mostrarPDF = false;
  pdfUrl: string = '';
  opcionSeleccionada: number = 1;
  fechaDesde: string = '';
  fechaHasta: string = '';


  constructor(private http: HttpClient, private discapacitadoService: DiscapacitadoService) { }

  generar() {
    this.loading = true;
    this.mostrarPDF = false;
    this.error = null;

    if (!this.fechaDesde || !this.fechaHasta) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, selecciona ambas fechas.',
      });
      this.loading = false;
      return;
    }

    const reporte = {
      fecha1: this.fechaDesde,
      fecha2: this.fechaHasta
    };


    this.discapacitadoService.generarReporteCiegos(reporte).subscribe({
      next: (response) => {
        this.todos = response.resultado;
        this.exportarPDF();
      },
      error: (err) => {
        this.error = 'Error al generar el reporte';
        console.error('Error al generar reporte:', err);
        this.loading = false;
      },
    });
  }

  exportarPDF() {
    const pdf = new jsPDF();

    const columns = [
      'Nombre',
      'Género',
      'Tipo de Ceguera',
      'Cuidador',
      'Fecha',
      'Estado',
    ];

    const body = this.todos.map((todo) => [
      todo.nombre,
      todo.genero,
      todo.tipo_ceguera,
      todo.nombre_cuidador,
      new Date(todo.fecha).toLocaleDateString(),  // formato legible
      todo.estado ? 'Activo' : 'Inactivo',
    ]);

    // Título
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('REPORTE DE PERSONAS CON DISCAPACIDAD VISUAL', 105, 20, { align: 'center' });

    // Subtítulos con fechas
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Fecha de inicio: ' + new Date(this.fechaDesde).toLocaleDateString(), 20, 35);
    pdf.text('Fecha de fin: ' + new Date(this.fechaHasta).toLocaleDateString(), 20, 42);

    // Tabla con estilo
    autoTable(pdf, {
      head: [columns],
      body: body,
      startY: 55,
      theme: 'striped',  // alterna colores por fila
      headStyles: {
        fillColor: [41, 128, 185],  // azul profesional
        textColor: 255,
        halign: 'center',
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 9,
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],  // gris claro
      },
      styles: {
        cellPadding: 3,
      },
      margin: { top: 60 }
    });

    // Mostrar vista previa
    const blob = pdf.output('blob');
    this.pdfUrl = URL.createObjectURL(blob);
    this.mostrarPDF = true;
    this.loading = false;

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Vista previa generada con éxito',
      showConfirmButton: false,
      timer: 1500,
    });
  }

}
