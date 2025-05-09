-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('docente', 'admin');

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "contraseña_hash" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id_estudiante" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "correo" TEXT NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id_estudiante")
);

-- CreateTable
CREATE TABLE "Practica" (
    "id_practica" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Practica_pkey" PRIMARY KEY ("id_practica")
);

-- CreateTable
CREATE TABLE "Evaluacion" (
    "id_evaluacion" TEXT NOT NULL,
    "fecha_evaluacion" TIMESTAMP(3) NOT NULL,
    "fecha_inicio_practica" TIMESTAMP(3) NOT NULL,
    "fecha_fin_practica" TIMESTAMP(3) NOT NULL,
    "nota_final" DOUBLE PRECISION,
    "reporte_cualitativo" TEXT,
    "id_docente" TEXT NOT NULL,
    "id_estudiante" TEXT NOT NULL,
    "id_practica" TEXT NOT NULL,

    CONSTRAINT "Evaluacion_pkey" PRIMARY KEY ("id_evaluacion")
);

-- CreateTable
CREATE TABLE "ComponenteEvaluacion" (
    "id_componente" TEXT NOT NULL,
    "nombre_componente" TEXT NOT NULL,
    "porcentaje" INTEGER NOT NULL,
    "nota_componente" DOUBLE PRECISION,
    "id_evaluacion" TEXT NOT NULL,

    CONSTRAINT "ComponenteEvaluacion_pkey" PRIMARY KEY ("id_componente")
);

-- CreateTable
CREATE TABLE "ItemEvaluacion" (
    "id_item" TEXT NOT NULL,
    "enunciado" TEXT NOT NULL,
    "nota" DOUBLE PRECISION,
    "id_componente" TEXT NOT NULL,

    CONSTRAINT "ItemEvaluacion_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "DescripcionFinal" (
    "id_evaluacion" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "cumplimiento" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "DescripcionFinal_pkey" PRIMARY KEY ("id_evaluacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_id_docente_fkey" FOREIGN KEY ("id_docente") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_id_estudiante_fkey" FOREIGN KEY ("id_estudiante") REFERENCES "Estudiante"("id_estudiante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_id_practica_fkey" FOREIGN KEY ("id_practica") REFERENCES "Practica"("id_practica") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponenteEvaluacion" ADD CONSTRAINT "ComponenteEvaluacion_id_evaluacion_fkey" FOREIGN KEY ("id_evaluacion") REFERENCES "Evaluacion"("id_evaluacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemEvaluacion" ADD CONSTRAINT "ItemEvaluacion_id_componente_fkey" FOREIGN KEY ("id_componente") REFERENCES "ComponenteEvaluacion"("id_componente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescripcionFinal" ADD CONSTRAINT "DescripcionFinal_id_evaluacion_fkey" FOREIGN KEY ("id_evaluacion") REFERENCES "Evaluacion"("id_evaluacion") ON DELETE RESTRICT ON UPDATE CASCADE;
