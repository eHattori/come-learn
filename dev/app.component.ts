import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl:'templates/questions.tpl.html' ,
})
export class AppComponent {
    data : {
            question: string,
            audio : string,
            status: string
        }[] = [
            {
                question : "Android is a software ___ for mobile devices.",
                audio : "audios/Q1.mp3",
                status: "ACTIVE",
                answer: "stack"

            },
            {
                question : "Angular is an open source web application framework, focused on developer productivity, speed, and ___ .",
                audio : "audios/Q2.mp3",
                status: "INACTIVE",
                answer: "testability"
            },
            {
                question : "The Go ___ language is an open source project to make programmers more productive.",
                audio : "audios/Q3.mp3",
                status: "INACTIVE",
                answer: "programming"
            },
            {
                question : "The Google Web Toolkit is a development toolkit for building and ___ complex browser-based applications.",
                audio : "audios/Q4.mp3",
                status: "INACTIVE",
                answer: "optimizing"
            },
            {
                question : "The Closure tools help developers to build rich web ___ with JavaScript.",
                audio : "audios/Q5.mp3",
                status: "INACTIVE",
                answer: "applications"
            }

        ];

    time : number;
    progress: number = 0;

    constructor(){
        this.time = 60;

        Observable.interval(1000)
            .take(60).map((x) => x-1)
            .subscribe((x) => {
                this.time = this.time - 1;
            });


    }

    play(index){
        var pl = document.getElementById('elemAudio' + index);
        pl.play();
    }

    hasValidAnswer(elem, question){

        if(elem.value.toUpperCase() == question.answer.toUpperCase()){
            question.status = "OK";
        } else {
            question.status = "INCORRECT";
        }
    }

    calcProgress(corretQuestions){
        this.progress = (100 * corretQuestions) / this.data.length;
    }

    nextQuestion(){
        var countCorretQuestion = 0;
        for(var i =0; i < this.data.length; i++){
            if(this.data[i].status == 'OK'){
                this.data[i].status = 'COMPLETE';
            }

            if(this.data[i].status == 'COMPLETE'){
                countCorretQuestion++;
            }
        }

        for(var i =0; i < this.data.length; i++){
            if(this.data[i].status == 'INACTIVE'){
                this.data[i].status = 'ACTIVE';
                this.time = 60;
                break;
            }
        }

        this.calcProgress(countCorretQuestion);
    }
}