class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Gönül Dağı", "Neşet Ertaş", "indir.png", "gonul.mp3"),    
    new Music("Neredesin Sen", "Neşet Ertaş", "resim1.png", "Neredesin-Sen.mp3"),    
    new Music("Yolcu", "Neşet Ertaş", "resim2.png", "yolcu.mp3")    
];
