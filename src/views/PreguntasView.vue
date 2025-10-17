<script setup>
import {ref, onMounted, onBeforeUnmount } from 'vue';
import { saveName, saveAnswer } from '@/utils';

const totalQuestions=10;
const currentAnswer=ref(0);
const questionNumber=ref(0);
const answer=ref("");
let id=0;
let inicio=0;
let fin=0;
const iniciarVisible=ref(true);
const inputType=ref("text");
const instrucciones=ref(true);

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
];

const respuestasCorrectas=[0, 42, 62, 6, 1275, 157, 56, 2, 4, 10, 3, 38, 45, 28, 12, 0];
const respuestas=ref([null,null,null,null,null,null,null,null,null,null]);
let answeredQuestions=[null,null,null,null,null,null,null,null,null,null];

const iniciar=async ()=>{
    if(answer.value!=""){
        document.addEventListener('focus',()=>{guardar(false);});
        const res=await saveName(answer.value);
        if(res.status==200){
            id=res.data.id;
            questionNumber.value=Math.floor(Math.random() * (preguntas.length-1)) + 1;
            answeredQuestions[currentAnswer.value]=questionNumber.value;
            currentAnswer.value++;
            inputType.value="number";
            answer.value="";
            iniciarVisible.value=false;
            instrucciones.value=false;
            inicio=Date.now();
            localStorage.setItem("respuestas", respuestas.value.toString());
            localStorage.setItem("inicio", inicio);
            localStorage.setItem("answeredQuestions", answeredQuestions.toString());
            localStorage.setItem("id", id);
        }
    }
}

const guardar=async (evento)=>{
    if((answer.value!="" || !evento) && !instrucciones.value){
        fin=Date.now();
        const data={
            numeroPregunta:currentAnswer.value,
            pregunta:questionNumber.value,
            respuesta:(evento?answer.value:null),
            tiempo:(fin-inicio)/1000
        }
        const res=await saveAnswer(id, data);
        if(res.status==200){
            respuestas.value[currentAnswer.value-1]=(evento?(answer.value==respuestasCorrectas[questionNumber.value]):false);//---false
            localStorage.setItem("respuestas", respuestas.value.toString());
            localStorage.setItem("inicio", inicio);
            localStorage.setItem("id", id);

            if(currentAnswer.value<totalQuestions){
                let nextQuestion=Math.floor(Math.random() * (preguntas.length-1)) + 1;
                while(answeredQuestions.includes(nextQuestion)){
                    nextQuestion=Math.floor(Math.random() * (preguntas.length-1)) + 1;
                }
                questionNumber.value=nextQuestion;
                answeredQuestions[currentAnswer.value]=questionNumber.value;
                localStorage.setItem("answeredQuestions",answeredQuestions.toString());
                currentAnswer.value++;
                answer.value="";
                inicio=Date.now();
                console.log("answeredQuestions",answeredQuestions);
                console.log("respuestas", respuestas.value);
            }else{
                console.log("eliminando");
                localStorage.removeItem("respuestas");
                localStorage.removeItem("inicio");
                localStorage.removeItem("answeredQuestions");
                localStorage.removeItem("id");
                window.location.reload();
            }
        }
    }
}

const handleKeyDown=(event)=>{
    if((currentAnswer.value>0 && !((event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=96 && event.keyCode<=105) || event.keyCode==8))){
        return event.preventDefault();
    }
}

onMounted(() => {
    if(localStorage.getItem("inicio")!==null){
        document.addEventListener('focus',()=>{guardar(false);});
        id=localStorage.getItem("id");
        localStorage.getItem("respuestas").split(",").forEach((element,index) => {
            if(element!==""){
                respuestas.value[index]=(element=="false"?false:true);
            }
        });
        localStorage.getItem("answeredQuestions").split(",").forEach((element,index) => {
            if(element!==""){
                answeredQuestions[index]=parseInt(element);
            }else{
                if(questionNumber.value==0){
                    questionNumber.value=answeredQuestions[index-1];
                    currentAnswer.value=index;
                }
            }
        });
        if(currentAnswer.value==0){
            questionNumber.value=answeredQuestions[totalQuestions-1];
            currentAnswer.value=totalQuestions;
        }
        inputType.value="number";
        iniciarVisible.value=false;
        instrucciones.value=false;
        inicio=localStorage.getItem("inicio");
        console.log("answeredQuestions", answeredQuestions);
    }
});

</script>
<template>
    <div class="flex min-h-screen w-full items-start bg-gray-900 transition duration-300 ease-in-out relative">
        <div class="flex-auto p-4">
            <div class="flex justify-center min-h-screen space-x-2">
                <div class="md:w-8/12 lg:w-4/12">
                    <p class="title-text mb-3">Examen diagnóstico</p><br>
                    <p v-if="instrucciones" class="subtitle-text mb-3"><b>Instrucciones:</b></p>
                    <ol v-if="instrucciones" type="1" class="subtitle-text mb-3">
                        <li><b>1</b> Las respuestas son números, por lo que letras y caracteres estan bloqueados</li>
                        <li><b>2</b> Una vez iniciado el examen no puedes pausarlo</li>
                        <li><b>3</b> Si minimizas o cambias de ventana la pregunta actual se saltará</li>
                    </ol>
                    <p class="subtitle-text mb-3">{{((currentAnswer>0)?`${currentAnswer} - `:'')}}{{ preguntas[questionNumber] }}</p><br>
                    <input
                        v-if="currentAnswer<preguntas.length-1"
                        :type="inputType"
                        v-model="answer"
                        class="form-input w-full rounded-md px-4 py-2 border focus:outline-none focus:ring-2 bg-gray-800 text-white border-gray-600 text-lg"
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
                            class="mt-5 flex items-center justify-center rounded-md focus:outline-none transition duration-300 bg-blue-500 hover:bg-blue-700 disabled:bg-blue-900 px-4 py-2 text-white text-base"
                            @click="guardar(true)"
                        >
                            Guardar y continuar
                        </button>
                    </div>
                </div>
                <div>
                    <div v-if="!iniciarVisible" v-for="i in totalQuestions"
                        :class="[
                            'w-7 border rounded-md border-gray-600 text-white text-base space-y-2 flex flex-wrap justify-evenly',
                            (respuestas[i-1]===null)?'':((respuestas[i-1])?' bg-lime-600':' bg-red-500')
                        ]"
                        @click="cambiar(i)"
                    >
                        {{ i }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>