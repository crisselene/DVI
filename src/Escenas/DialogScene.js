export default class DialogScene extends Phaser.Scene{

    constructor() {
		super('DialogScene')
	}

    preload(){

    }

    create(){
        //Añadimos el texto y lo ponemos en false para que no aparezca cuando no queremos que lo haga
        this.dialogText = this.add.text(100, 100, '', { fontSize: '32px' });
        this.dialogText.setVisible(false);
    }


    showDialog(text){
        this.dialogText.setText(text);
        this.dialogText.setVisible(true);

        this.time.delayedCall(2000, () => {
            this.dialogText.setVisible(false);
        });
    }
}