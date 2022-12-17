class Task {
    constructor(Discord, client, run){
        this.Discord = Discord;
        this.client = client;

        this.run = run;
    }

    run(){
        this.run();
    }

}

module.exports = Task;