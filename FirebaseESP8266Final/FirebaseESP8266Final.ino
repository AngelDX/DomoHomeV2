#include <FirebaseArduino.h>
#include <DHT.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

#define FIREBASE_HOST "arduino-e3453.firebaseio.com"
#define FIREBASE_AUTH "rHl4rPcBarroX9YjmReczEvYUlQHrCEiS78Dlvz4"
#define WIFI_SSID "MIFIDX"
#define WIFI_PASSWORD "AngelDX123*"

#define DHTTYPE DHT22
#define DHTPIN  2
#define AIREPIN  A0// PIN ANALOGICO

DHT dht(DHTPIN, DHTTYPE, 22);

const int LSALA = 4;
const int LDORMITORIO = 5;
const int LCOCINA = 12;
const int LBANIO = 13;
const int PIR = 14;
const int SIRENA = 15;

float temperatura;
float humedad;
float calidad_aire;
int data_pir;

void setup() {
  Serial.begin(115200);
  
  pinMode(AIREPIN,INPUT);
  pinMode(LSALA,OUTPUT);
  pinMode(LDORMITORIO,OUTPUT);
  pinMode(LCOCINA,OUTPUT);
  pinMode(LBANIO,OUTPUT);
  pinMode(PIR,INPUT);
  pinMode(SIRENA,OUTPUT);
  
  WiFi.softAPdisconnect (true);
  
  Serial.printf("Connecting to %s ", WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  dht.begin();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
   unsigned long currentMillis = millis();
   temperatura = dht.readTemperature();
   humedad = dht.readHumidity();
   calidad_aire = analogRead(AIREPIN);
   data_pir = digitalRead(PIR);
   Serial.print(data_pir);
   
   Firebase.setFloat("sensores/temperatura",temperatura);
   Firebase.setFloat("sensores/humedad",humedad);
   Firebase.setFloat("sensores/aire",calidad_aire);
   Firebase.setInt("sensores/presencia",data_pir);

   Serial.println("**********************************************************************************");
   Serial.print("Temperatura actual: ");
   Serial.print(temperatura);
   Serial.println("°C");
   Serial.print("Humedad actual: "); 
   Serial.print(humedad, 2);
   Serial.println("%");
   Serial.print("Calidad Aire actual: "); 
   Serial.println(calidad_aire, 2);
   Serial.println("**********************************************************************************");
   Serial.println();
   
  DynamicJsonBuffer jsonBuffer;
  JsonObject& temperatureObject = jsonBuffer.createObject();
  JsonObject& tempTime = temperatureObject.createNestedObject("timestamp");
  temperatureObject["temperature"] = temperatura;
  temperatureObject["humidity"] = humedad;
  temperatureObject["aire"] = calidad_aire;
  tempTime[".sv"] = "timestamp";

  float s_aire=Firebase.getFloat("sensores/aire");
  float s_humedad=Firebase.getFloat("sensores/humedad");
  float s_temperatura=Firebase.getFloat("sensores/temperatura");
  
  if((s_aire != calidad_aire) || (s_humedad != humedad) || (s_temperatura || temperatura)){
    Firebase.push("datasensor/dht", temperatureObject);
  }

  String estado_led_sala = Firebase.getString("actuadores/lampara_sala");
  //Serial.println(estado_led_sala);
  if(estado_led_sala=="on"){
    digitalWrite(LSALA, HIGH);
  }else{
    digitalWrite(LSALA, LOW);
  }

  String estado_led_dormitorio = Firebase.getString("actuadores/lampara_dormitorio");
  if(estado_led_dormitorio=="on"){
    digitalWrite(LDORMITORIO, HIGH);
  }else{
    digitalWrite(LDORMITORIO, LOW);
  }

  String estado_led_cocina = Firebase.getString("actuadores/lampara_cocina");
  if(estado_led_cocina=="on"){
    digitalWrite(LCOCINA, HIGH);
  }else{
    digitalWrite(LCOCINA, LOW);
  }

  String estado_led_banio = Firebase.getString("actuadores/lampara_banio");
  if(estado_led_banio=="on"){
    digitalWrite(LBANIO, HIGH);
  }else{
    digitalWrite(LBANIO, LOW);
  }

  String alarma_activa = Firebase.getString("actuadores/alarma");
  int estado_pir = Firebase.getInt("sensores/presencia");
  if(alarma_activa=="on" && estado_pir==1){
    digitalWrite(SIRENA, HIGH);
  }else{
    digitalWrite(SIRENA, LOW);
  }
  
  delay(1000);
}


