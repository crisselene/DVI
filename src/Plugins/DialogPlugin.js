export default class DialogPlugin {
    constructor(scene) {
        // the scene that owns the plugin
        this.scene = scene;
        this.systems = scene.sys;

    };
    // Initialize the dialog modal
    init(opts) {
        // Check to see if any optional parameters were passed
        if (!opts) opts = {};
        // set properties from opts object or use defaults
        this.borderThickness = opts.borderThickness || 3;
        this.borderColor = opts.borderColor || 0x907748;
        this.borderAlpha = opts.borderAlpha || 1;
        this.windowAlpha = opts.windowAlpha || 0.8;
        this.windowColor = opts.windowColor || 0x303030;
        this.windowHeight = opts.windowHeight || 150;
        this.padding = opts.padding || 32;
        this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
        this.dialogSpeed = opts.dialogSpeed || 3;
        // used for animating the text
        this.eventCounter = 0;
        // if the dialog window is shown
        this.visible = true;
        // the current text in the window
        this.text = "";
        // the text that will be displayed in the window
        this.dialog = "";
        this.graphics;
        //this.closeBtn;
        // Create the dialog window
        this._createWindow();
    }

    // Gets the width of the game (based on the scene)
    _getGameWidth() {
        return this.scene.cameras.main.width;
    }
    // Gets the height of the game (based on the scene)
    _getGameHeight() {
        return this.scene.cameras.main.height;
    }
    // Calculates where to place the dialog window based on the game size
    _calculateWindowDimensions(width, height) {
        var x = this.padding;
        var y = height - this.windowHeight - this.padding;
        var rectWidth = width - (this.padding * 2);
        var rectHeight = this.windowHeight;
        return {
            x,
            y,
            rectWidth,
            rectHeight
        };
    }
    // Creates the inner dialog window (where the text is displayed)
    _createInnerWindow(x, y, rectWidth, rectHeight) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }
    // Creates the border rectangle of the dialog window
    _createOuterWindow(x, y, rectWidth, rectHeight) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }

    // Creates the dialog window
    _createWindow() {
        var gameHeight = this._getGameHeight();
        var gameWidth = this._getGameWidth();
        var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.scene.add.graphics();
        this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this._createCloseModalButton();
        this._createCloseModalButtonBorder();
    }
    // Creates the close dialog window button
    _createCloseModalButton() {
        var self = this;
        this.closeBtn = this.scene.make.text({
            x: this._getGameWidth() - this.padding - 14,
            y: this._getGameHeight() - this.windowHeight - this.padding + 3,
            text: 'X',
            style: {
                font: 'bold 12px Arial',
                fill: this.closeBtnColor
            }
        });
        this.closeBtn.setInteractive();
        this.closeBtn.on('pointerover', function () {
            this.setTint(0xff0000);
        });
        this.closeBtn.on('pointerout', function () {
            this.clearTint();
        });
        this.closeBtn.on('pointerdown', function () {
            self.toggleWindow();
        });

    }
    _createCloseModalButtonBorder() {
        var x = this._getGameWidth() - this.padding - 20;
        var y = this._getGameHeight() - this.windowHeight - this.padding;
        this.graphics.strokeRect(x, y, 20, 20);
    }
    // Hide/Show the dialog window
    toggleWindow() {
        this.visible = !this.visible;
        if (this.text) this.text.visible = this.visible;
        if (this.graphics) this.graphics.visible = this.visible;
        if (this.closeBtn) this.closeBtn.visible = this.visible;
    }
    // Sets the text for the dialog window
    setText(text, animate) {
        // Reset the dialog
        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) this.timedEvent.remove();
        var tempText = animate ? '' : text;
        this._setText(tempText);
        if (animate) {
            this.timedEvent = this.scene.time.addEvent({
                delay: 150 - (this.dialogSpeed * 30),
                callback: this._animateText,
                callbackScope: this,
                loop: true
            });
        }
    }
    // Calcuate the position of the text in the dialog window
    _setText(text) {
        // Reset the dialog
        if (this.text) this.text.destroy();
        var x = this.padding + 10;
        var y = this._getGameHeight() - this.windowHeight - this.padding + 10;
        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
                wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }
            }
        });
    }
    // Slowly displays the text in the window to make it appear annimated
    _animateText() {
        this.eventCounter++;
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if (this.eventCounter === this.dialog.length) {
            this.timedEvent.remove();
        }
    }
}