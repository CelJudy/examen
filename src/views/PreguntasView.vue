<script setup>
import {ref, onMounted, onBeforeUnmount } from 'vue';
import { saveName, saveAnswer, selectAnswers } from '@/utils';
import VueHtml2pdf from 'vue-html2pdf'; 

//nombre no dejar vacio
//revisar segunda pregunta
//poder saltar las preguntas

const currentAnswer=ref(0);
const answer=ref("");
let id=0;
let inicio=0;
let fin=0;
const iniciarVisible=ref(true);
const inputType=ref("text");

const preguntas=[
    'Escribe tu nombre completo',
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
    'Generando PDF...'
]

const respuestas=[0, 42, 62, 6, 1275, 157, 56, 2, 4, 10, 3, 38, 45, 28, 12, 0];

let tiempo=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const respondido=ref([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]);

/* const iniciar=async ()=>{
    if(currentAnswer.value==preguntas.length-3){
        buttonValue.value="Terminar";
    }
    if(currentAnswer.value>0){
        fin=Date.now();
        const data={
            pregunta:currentAnswer.value,
            respuesta:answer.value,
            tiempo:(fin-inicio)/1000
        }
        const res=await saveAnswer(id, data);
        fin=0;
        answer.value="";
        if(currentAnswer.value==preguntas.length-2){
            iniciarVisible.value=false;
            //pdf
        }
        currentAnswer.value++;
        inicio=Date.now();
        return
    }
} */

const iniciar=async ()=>{
    const res=await saveName(answer.value);
    if(res.status==200){
        id=res.data.id;
        currentAnswer.value++;
        inputType.value="number";
        answer.value="";
        iniciarVisible.value=false;
        inicio=Date.now();
    }
}

const siguiente=()=>{
    if(currentAnswer.value<preguntas.length-2){
        fin=Date.now();
        tiempo[currentAnswer.value]+=(fin-inicio)/1000;
        currentAnswer.value++;
        answer.value="";
        inicio=Date.now();
    }
}
const cambiar=(num)=>{
    if(currentAnswer.value<preguntas.length-2){
        fin=Date.now();
        tiempo[currentAnswer.value]+=(fin-inicio)/1000;
        currentAnswer.value=num;
        answer.value="";
        inicio=Date.now();
    }
}
const anterior=()=>{
    if(currentAnswer.value>1){
        fin=Date.now();
        tiempo[currentAnswer.value]+=(fin-inicio)/1000;
        currentAnswer.value--;
        answer.value="";
        inicio=Date.now();
    }
}
const guardar=async ()=>{
    fin=Date.now();
    const data={
        pregunta:currentAnswer.value,
        respuesta:answer.value,
        tiempo:(fin-inicio)/1000
    }
    const res=await saveAnswer(id, data);
    respondido.value[currentAnswer.value]=true;
}

const lostWindowFocus=()=> {
    currentAnswer.value=0;
    answer.value="";
    id=0;
    inicio=0;
    fin=0;
    iniciarVisible.value=true;
}

/* onMounted(() => {
    document.addEventListener('visibilitychange', lostWindowFocus);
    document.addEventListener('blur', lostWindowFocus);
});

onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange');
    document.removeEventListener('blur');
}); */

    

</script>
<template>
    <div class="flex min-h-screen w-full items-start bg-gray-900 transition duration-300 ease-in-out relative">
        <div class="flex-auto p-4">
            <div class="flex justify-center min-h-screen space-x-2">
                <div class="md:w-8/12 lg:w-4/12">

                    <p class="title-text mb-3">Examen diagnóstico</p><br>
                    <p class="subtitle-text mb-3">{{((currentAnswer>0)?`${currentAnswer} - `:'')}}{{ preguntas[currentAnswer] }}</p><br>
                    <input
                        v-if="currentAnswer<preguntas.length-1"
                        :type="inputType"
                        v-model="answer"
                        class="form-input w-full rounded-md px-4 py-2 border focus:outline-none focus:ring-2 bg-gray-800 text-white border-gray-600 text-lg"
                        @blur="handleBlur"
                        @keydown="handleKeyDown"
                    />

                    <button
                        class="mt-5 w-full flex items-center justify-center rounded-md focus:outline-none transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white text-base"
                        @click="iniciar"
                        v-if="iniciarVisible"
                    >
                    Iniciar
                    </button>
                    <div class="flex flex-wrap justify-evenly space-x-2" v-if="!iniciarVisible">
                        <button
                            class="mt-5 flex items-center justify-center rounded-md focus:outline-none transition duration-300 bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white text-base"
                            @click="anterior"
                        >
                        Anterior
                        </button>
                        <button
                            class="mt-5 flex items-center justify-center rounded-md focus:outline-none transition duration-300 bg-blue-500 hover:bg-blue-700 disabled:bg-blue-900 px-4 py-2 text-white text-base"
                            @click="guardar"
                            :disabled="respondido[currentAnswer]"
                        >
                            Guardar
                        </button>
                        <button
                            class="mt-5 flex items-center justify-center rounded-md focus:outline-none transition duration-300 bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white text-base"
                            @click="siguiente"
                        >
                        Siguiente
                        </button>
                    </div>
                    <button
                        class="mt-5 w-full flex items-center justify-center rounded-md focus:outline-none transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white text-base"
                        v-if="!iniciarVisible"
                    >
                    Terminar
                    </button>
                </div>
                <div>
                    <button v-if="!iniciarVisible" v-for="i in (preguntas.length-2)"
                        :class="[
                            'w-7 border rounded-md border-gray-600 text-white text-base space-y-2 flex flex-wrap justify-evenly',
                            (respondido[i])?' bg-blue-500 ':''
                        ]"
                        @click="cambiar(i)"
                    >
                        {{ i }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>