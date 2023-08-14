// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Juego extends Phaser.Scene {
  constructor() {

    super("Juego");
  }

  init() {
    this.puntuacion = 0
    this.nivel = 1
  }


  preload() {
    this.load.image("Barra", "./assets/images/Barra.png");
    this.load.image("obstaculo", "./assets/images/obstaculo.png");
    this.load.image("Bola", "./assets/images/bola.png");
  }

  create() {
    this.obstaculo = this.physics.add.sprite(400, 300, "obstaculo").setImmovable().setScale(0.5)
    this.obstaculos = this.physics.add.staticGroup ();
    this.pelota = this.physics.add.sprite(200,100, "Bola").setScale(0.2)
    this.plataforma = this.physics.add.sprite (500,500, "Barra").setScale(0.5).setImmovable()
    this.plataforma.setCollideWorldBounds(true)
    this.pelota.setCollideWorldBounds(true)
    this.pelota.setBounce(1)
    this.velocidadPelota = 200
    this.pelota.setVelocity(this.velocidadPelota, this.velocidadPelota)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(
      this.plataforma,
      this.pelota,
      this.rebote,
      null,
      this
    )
    this.physics.add.collider(
      this.pelota,
      this.obstaculo,
    )
    this.physics.add.collider(
      this.plataforma,
      this.obstaculo)

    this.puntos = this.add.text(20, 15, "PUNTOS: " + this.puntuacion, {fontsize:"20px", fill:"#FFFFFF"});
    this.niveles = this.add.text(160, 15, "NIVEL: " + this.nivel,{fontsize: "20px", fill:"#FFFFFF" })
    const colores = Phaser.Display.Color.RandomRGB()
    this.cameras.main.setBackgroundColor(colores)
  }

  update() {
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
      this.plataforma.setVelocityX(-350);
    }
    else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
      this.plataforma.setVelocityX(350);
    }
    else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown){
      this.plataforma.setVelocityY(-350)
    }
    else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown){
      this.plataforma.setVelocityY(350)
    }
    else {this.plataforma.setVelocity(0)}

    if (this.puntuacion ==10 ) {this.siguienteNivel();}

    if(this.pelota.y>570) {this.derrota();}


  }
  rebote(){
    this.puntuacion +=1
    this.puntos.setText("PUNTOS: " + this.puntuacion);
    console.log("puntuacion" + this.puntuacion)
    if (this.pelota.body.velocity.x > 0) {
      this.pelota.setVelocity(200, -300);
    } else {
      this.pelota.setVelocity(-200, -300);
    }  
  
  }
  siguienteNivel() {
    this.nivel++;
    this.puntuacion = 0;
    this.niveles.setText("NIVEL: " + this.nivel);
    this.puntos.setText("PUNTOS: " + this.puntuacion);
    this.velocidadPelota *= 1.1;
  
    if (this.nivel >= 20) {
      this.victoria();
    }
  
    // Generar el obstáculo aleatoriamente
    let coordenadaX = Phaser.Math.Between(100, 700);
    let coordenadaY = Phaser.Math.Between(100, 400);
    let escalaObjeto = Phaser.Math.FloatBetween(0.4, 0.5);
  
    // Elimina el obstáculo anterior si existe
    if (this.obstaculo) {
      this.obstaculo.destroy();
    }
    
    const colores = Phaser.Display.Color.RandomRGB();
    this.cameras.main.setBackgroundColor(colores);  
    // Crear un nuevo obstáculo
    this.obstaculo = this.obstaculos.create(coordenadaX, coordenadaY, "obstaculo").setScale(escalaObjeto);
    this.obstaculo.refreshBody();
    this.physics.add.collider(this.plataforma, this.obstaculo);
    this.physics.add.collider(this.pelota, this.obstaculo);  // Agregar colisión con la plataforma
  }
  
  

  victoria(){
    this.textoVictoria = this.add.text(300,300, "¡VICTORIA!", {fontSize:"36px", fill:"#FFFFFF"})
    this.obstaculo.disableBody(true, true)
    this.pelota.disableBody(true, true)
    this.plataforma.disableBody(true, true)
  }

  derrota(){
    console.log("sos un boludo");
    this.textoVictoria = this.add.text(300,300, "¡DERROTA!", {fontSize:"36px", fill:"#FFFFFF"})
    this.obstaculo.disableBody(true, true)
    this.pelota.disableBody(true, true)
    this.plataforma.disableBody(true, true)
  }

}
