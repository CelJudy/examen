<script setup>
import { onMounted, onBeforeMount } from 'vue';
import html2pdf from "html2pdf.js";
//import { selectAnswers } from '@/utils';

const preguntas=[
    '',
    '¿Cual es el siguiente número en esta secuencia? 2, 6, 12, 20, 30, ?',
    '¿Cuál es el menor número entero positivo que al dividirse entre 3, 4 y 5 deja residuo 2?',
    '¿En cuántas formas diferentes se pueden ordenar las letras de la palabra “PRO”?',
    '¿Cuál es la suma de los 50 primeros números naturales?',
    'Si un virus que se duplica cada segundo y pasados 50 segundos hay 1256, ¿Cuantos virus habia pasados 47 segundos?',
    'Si Juan tiene 8 años y su hermana tiene la mitad de la edad de Juan, ¿Que edad tendra la hermana de Juan cuando este tenga 60?',
    'En una carrera, rebasas al segundo lugar. ¿En qué lugar quedas?',
    'Un hombre tiene 53 calcetines: 21 negros, 15 azules y 17 blancos. ¿Cuántos debe tomar como mínimo en la oscuridad para asegurar un par del mismo color?',
    'Si divides repetidamente un número a la mitad hasta llegar a 1, ¿cuántas veces debes dividir el número 1024?',
    'Si 3 trabajadores hacen un trabajo en 6 días, ¿cuántos días necesitarán 6 trabajadores para hacer el mismo trabajo?',
    'Encuentra el número que falta en la serie: 7, 14, 19, 26, 31, ?, 43',
    'Un tren de 150 metros pasa por un poste en 15 segundos. ¿Cuántos segundos tarda en pasar completamente un puente de 450 metros?',
    'Una tienda aplica un 20% de descuento y luego un 10% adicional sobre el precio ya rebajado. ¿Cuál es el descuento total aplicado?',
    '¿Cuántos meses tienen 28 días?',
    'Un reloj marca las 3:15. ¿Cuál es el ángulo entre la aguja de las horas y la de los minutos?',
    '',
];

const respuestas=[0, 42, 62, 6, 1275, 157, 56, 2, 4, 10, 3, 38, 45, 28, 12, 0];

let res={
    data:[]
};
/* onBeforeMount(async ()=>{
    res=await selectAnswers(22);
}); */


const generar=async () => {
    console.log(res.data[0]);
    html2pdf(document.getElementById("element-to-convert"), {
        margin: 15,
        filename: "generated-pdf.pdf",
    });
};

</script>
<template>
    <button @click="generar">
        xasx
    </button>
    <div id="element-to-convert">
        <h1></h1>
        <p v-for="i in (preguntas.length-1)">
            {{i}} - {{preguntas[i]}}
                <span  style="color:green">{{ res.data[0][`p${i}`] }}</span>
        </p>
        
    </div>
</template>