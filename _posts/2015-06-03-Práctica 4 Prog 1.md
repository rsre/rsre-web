---
layout: post
title: Práctica 4 Prog 1
categories: []
tags: [ETSIST]
fullview: true
comments: true
---
<h3 style="text-align: center;">ATTENTION: POSSIBLE SPAGHETTI CODE AHEAD</h3>
Bueno, en vista de que el examen de recuperación de <strong>Programación I</strong> es dentro de un par de horas, supongo que no pasará nada si publico mi solución a la <strong>Práctica 4</strong> de esta asignatura que entregué en Enero de este año.

El enunciado decía lo siguiente:
<blockquote>Se pretende codificar un programa que simule el manejo de una lista de impresoras. En cada impresora de la lista se encolarán los nombres de los ficheros a imprimir y se podrá dar órdenes para mandar los ficheros a imprimir, lo cual se simulará a través de la salida estándar (pantalla).</blockquote>
<div class="page" title="Page 3">
<div class="layoutArea">
<div class="column">
<blockquote>El programa se codificará en tres fases, que irán permitiendo al alumno ir probando el programa e irlo ampliando sobre código ya probado.
<ol>
	<li>PRIMERA FASE:
Codificar en C un programa colaImpresora.c que maneje una estructura de tipo cola en la que se almacenarán los nombres de los ficheros que se quieren imprimir.Los 6 nombres que se van a utilizar para generar los nombres de los ficheros, se pasarán al programa en el mandato de ejecución, y el programa los recibirá como parámetros de main(), de tal forma que la ejecución será:
<pre class="lang:sh decode:true ">C:\&gt; colaImpresora fichero1 fichero2 fichero3 fichero4 fichero5 fichero6
</pre>
Donde ficheroN es el nombre que el alumno asigne a un determinado fichero.</li>
	<li>SEGUNDA FASE:
Codificar en C un programa listaImpresoras.c que maneje una lista de impresoras.
Cada impresora se almacenará en una estructura con tres campos:
<ul>
	<li>nombre: identificador de la impresora. Cadena de 20 caracteres significativos.</li>
	<li>número de ficheros pendientes de impresión en la cola de la impresora.</li>
	<li>la cola de ficheros (resultante de la primera fase da la práctica).Inicialmente el programa leerá el nombre de seis ficheros que se pasará al programa en la ejecución, como parámetros de main(), de tal forma que la ejecución será:
<pre class="lang:sh decode:true">C:\&gt; listaImpresoras fichero1 fichero2 fichero3 fichero4 fichero5 fichero6</pre>
</li>
</ul>
</li>
	<li>TERCERA FASE:
  Se copiarán en el directorio en el que se vaya a codificar el programa fuente, los 6 ficheros de texto que se proporcionan en Moodle (a.txt b.txt c.txt d.txt e.txt f.txt).Se codificará un nuevo programa fuente listaImpresorasFicheros.c partiendo del código de listaImpresoras.c y realizando las siguientes modificaciones:Se modificarán las opciones 4. Imprimir un fichero y 5. Borrar una impresora, para que cada vez que se escriba por la salida estándar el nombre de un fichero, se escriba también el contenido del correspondiente fichero.Se modificará la opción 6. Salir, para que además de escribir el mensaje de despedida, se almacene en un fichero binario de nombre listaImpresoras.bin, el contenido de las posiciones ocupadas de la lista de impresoras para su uso en una sesión de trabajo posterior.Se modificará la función de inicialización de la lista, para que si el fichero listaImpresoras.bin existe, el contenido del fichero se añada en la lista de impresoras, ocupando las primeras posiciones de la lista.</li>
</ol>
</blockquote>
</div>
</div>
</div>


En el momento de escribir el código planteé varias posibles soluciones: pasar todos los valores de un sitio a otro por referencia, hacer una máquina de estados con una impresora dónde solo se cambiaran las variables de la misma...pero al final me decidí por una opción fatídica que me acabó costando la nota: decidí usar variables globales.

Era un chollazo, me ahorraba andar pasando tantos parámetros y al fin y al cabo muchas funciones tenían que acceder a esos valores ¿por qué no declararlos para todo el programa y me quitaba de andar jugando con ellos? Pues resulta que las variables globales están prohibidisimas, algo que yo desconocía en el momento.

Entregué mi práctica muy confiado, habiendo entregado todas las partes optativas y cual fue mi sorpresa cuando publicaron la nota y me encontré un 0. Después de hablar con el profesor conseguí subir la nota a un aprobado porque después de todo <strong>sí que paso parámetros</strong> de todas las formas que nos han enseñado, ergo estaba demostrado que sabía pasar parámetros. También descubrí que el profesor pensaba que había <em>usado recursos extraños (sic)</em> en la parte optativa de ficheros, pero de eso hablaremos después.

Os dejo el código:
<pre class="theme:solarized-light nums:true lang:c decode:true " title="listaImpresorasFicheros.c">/**************************************************************
*listaImpresorasFicheros.c
*Ricardo Sanz Retuerta
*Maneja una lista de impresoras imprimiendo ficheros
*y guarda el estado entre una ejecucion y otra
***************************************************************/
#include&lt;stdio.h&gt;
#include&lt;string.h&gt;
#include&lt;stdlib.h&gt;
#define COLA (10+1)
#define IMPRESORAS 4

typedef struct{
  char colaFich[COLA][12+1];
  int inicio;
  int final;
}tCola;

typedef struct{
  char nombre[10+1];
  int pendientes;
  tCola colaImp;
}tImpresora;

tImpresora lista[IMPRESORAS];//lista esta declarada como variable global para simplificar el programa

//Declaracion de las funciones
int colaLlena(tCola *pcola);
/*************************************************************
*Nombre:colaLlena
*Descripcion: analiza si una cola esta llena
*Parametros de entrada: pcola: un puntero a la cola a analizar
*
*Parametros de salida: devuelve un entero. 1 si esta llena, 0 si no esta llena
*Parametros de entrada/salida:-----
*************************************************************/
int colaVacia(tCola *pcola);
/*************************************************************
*Nombre:colaVacia
*Descripcion:analiza si una cola esta vacia
*Parametros de entrada:pcola: un puntero a la cola a analizar
*
*Parametros de salida: devuelve 1 si esta vacia y 0 si no esta vacia
*Parametros de entrada/salida:----
*************************************************************/
int huecoLibre(void);
/*************************************************************
*Nombre:huecoLibre
*Descripcion:busca huecos en la lista de impresoras
*Parametros de entrada:----
*
*Parametros de salida:devuelve un entero, la primera posicion
*                     libre en la lista o -1 si esta llena
*Parametros de entrada/salida:------
*************************************************************/
int listaVacia(void);
/*************************************************************
*Nombre:listaVacia
*Descripcion:analiza si la lista esta vacia
*Parametros de entrada:----
*
*Parametros de salida:devuelve el primer hueco ocupado en
*                       la lista o -1 si está vacia
*Parametros de entrada/salida:-------
*************************************************************/
int listaLlena(void);
/*************************************************************
*Nombre:listaLlena
*Descripcion:analiza si la lista esta llena
*Parametros de entrada:-----
*
*Parametros de salida:devuelve 0 si la lista tiene al
*                       menos un hueco libre, 1 si esta llena
*Parametros de entrada/salida:--------
*************************************************************/
void meterCola(char cadena[], tCola *pcola);
/*************************************************************
*Nombre:meterCola
*Descripcion:pone una cadena de caracteres en una cola
*Parametros de entrada:cadena: la cadena que quieres meter
*                      pcola: puntero a la cola donde lo quieres meter
*Parametros de salida:---
*Parametros de entrada/salida:-----
*************************************************************/
int enLista (char buscar[]);
/*************************************************************
*Nombre:enLista
*Descripcion:busca en la lista una impresora
*Parametros de entrada:buscar:el nombre de la impresora que quieres buscar
*
*Parametros de salida:si lo encuentra, devuelve la posicion de la impresora
*                     si no, devuele -1
*Parametros de entrada/salida:-----
*************************************************************/
void mandarFicherosPorLote(char *argv[], int n, tImpresora *pimpresora);
/*************************************************************
*Nombre:mandarFicherosPorLote
*Descripcion:manda n ficheros de argv a la cola de una impresora
*Parametros de entrada: argv: puntero a donde estan las cadenas
*                          que se van a meter en la cola
*                       n: el numero de ficheros a meter
*                       pimpresora: puntero a la impresora donde
*                           se van a meter las cadenas
*Parametros de salida:----
*Parametros de entrada/salida:----
*************************************************************/
void sacarCola(char *ficheroOut, tCola *pcola);
/*************************************************************
*Nombre:sacarCola
*Descripcion:saca 1 fichero de la cola
*Parametros de entrada: pcola: puntero a la cola de la que se quiere desencolar
*
*Parametros de salida: ficheroOut: donde se guarda el fichero sacado
*Parametros de entrada/salida:----
*************************************************************/
void imprimirCola(tCola *pcola);
/*************************************************************
*Nombre:imprimirCola
*Descripcion:imprime toda una cola de impresion
*Parametros de entrada:pcola: puntero a la cola que se quiere imprimir
*
*Parametros de salida:----
*Parametros de entrada/salida:-----
*************************************************************/
void inicializarCola(tCola *pcola);
/*************************************************************
*Nombre:inicializarCola
*Descripcion:inicializa una cola poniendo a 0 todos sus parametros
*Parametros de entrada:pcola:puntero a la cola que se quiere inicializar
*
*Parametros de salida:----
*Parametros de entrada/salida:----
*************************************************************/
void inicializarLista(void);
/*************************************************************
*Nombre:inicializarLista
*Descripcion:inicializa la lista poniendo a cero todos sus parametros
*Parametros de entrada:----
*
*Parametros de salida:-----
*Parametros de entrada/salida:-----
*************************************************************/
int guardarLista(void);
/*************************************************************
*Nombre:guardarLista
*Descripcion:guarda el estado actual de la lista en un fichero externo
*Parametros de entrada:----
*
*Parametros de salida:devuelve 1 si la guarda correctamente, 0 si hay error
*Parametros de entrada/salida:----
*************************************************************/
int recuperarLista(void);
/*************************************************************
*Nombre:recuperarLista
*Descripcion:recupera una lista si encuentra una copia guardada
*Parametros de entrada:----
*
*Parametros de salida:devuelve 1 si la guarda correctamente, 0 si hay error
*Parametros de entrada/salida:----
*************************************************************/
int menu (void);
/*************************************************************
*Nombre:menu
*Descripcion:muestra un menu y pide al usuario una opcion
*Parametros de entrada:---
*
*Parametros de salida:devuelve la opcion elegida
*Parametros de entrada/salida:----
*************************************************************/
void agregarImpresora(int numImpresora);
/*************************************************************
*Nombre:agregarImpresora
*Descripcion:agrega una impresora a la lista
*Parametros de entrada:numImpresora:la posicion en la que se
*                           quiere almacenar la impresora
*Parametros de salida:----
*Parametros de entrada/salida:----
*************************************************************/
void leerFichero(char ficheroOut[13]);
/*************************************************************
*Nombre:leerFichero
*Descripcion:lee un fichero de texto y lo muestra por salida estandar
*Parametros de entrada:ficheroOut: el nombre del fichero a imprimir
*
*Parametros de salida:----
*Parametros de entrada/salida:----
*************************************************************/
void borrarImpresora(int queImp);
/*************************************************************
*Nombre:borrarImpresora
*Descripcion:borra una impresora de la lista
*Parametros de entrada:queImp:el numero de la impresora que se quiere borrar
*
*Parametros de salida:----
*Parametros de entrada/salida:----
*************************************************************/

//FUNCION PRINCIPAL
int main(int argc, char *argv[])
{
  char ficheroOut[12+1];
  int condicion;
  int n;
  int i;
  char input[21];
  int queImp;

  condicion=1;
  if(!recuperarLista())
    inicializarLista();

  if(argc==7)
    while(condicion)
    {
      switch(menu())
      {
        case 1:
          if(!listaLlena())
            agregarImpresora(huecoLibre());
          else
            printf("No quedan impresoras por agregar!\n\n");
          break;

        case 2:
          if(listaVacia()&gt;=0)
          {
            printf("Impresoras disponibles:\n");
            for(i=0;i&lt;IMPRESORAS;i++)
              printf("\n%s",lista[i].nombre);
            printf("\nIntroduzca el nombre de la impresora: ");
            fgets(input,20,stdin);
            if((queImp=enLista(input))&gt;=0)
            {
              n=1+(rand()%6);
              printf("Mandando %d ficheros por lote a la impresora...\n",n);
              mandarFicherosPorLote(argv,n,&amp;lista[queImp]);
          }
          else
            printf("Esa impresora no existe!\n\n");
          }
          else
            printf("La lista de impresoras esta vacia!\n\n");
          break;

        case 3:
          for(i=0;i&lt;IMPRESORAS;i++)
          {
            if(lista[i].nombre[0]!='\0')
            {
              printf("Ficheros en la cola de impresión de: %s\n",lista[i].nombre);
              imprimirCola(&amp;lista[i].colaImp);
            }
          }
          break;

        case 4:
          if(listaVacia()&gt;=0)
          {
            printf("Impresoras disponibles:\n");
            for(i=0;i&lt;IMPRESORAS;i++)
              printf("\n%s",lista[i].nombre);
            printf("\nIntroduzca el nombre de la impresora: ");
            fgets(input,20,stdin);
            if((queImp=enLista(input))&gt;=0)
            {
              if(lista[queImp].pendientes&gt;0)
              {
                sacarCola(ficheroOut, &amp;lista[queImp].colaImp);
                printf("Imprimiendo '%s'\n\n",ficheroOut);
                leerFichero(ficheroOut);
                lista[queImp].pendientes--;
                printf("Quedan %d ficheros en esta cola.\n\n", lista[queImp].pendientes);
              }
              else
                printf("No quedan ficheros por imprimir en esta cola!\n\n");
            }
            else
              printf("Esa impresora no existe!\n\n");
          }
          else
            printf("La lista de impresoras esta vacia!\n\n");
          break;

        case 5:
          if(listaVacia()&gt;=0)
          {
            printf("Impresoras disponibles:\n");
            for(i=0;i&lt;IMPRESORAS;i++)
              printf("\n%s",lista[i].nombre);
            printf("\nIntroduzca el nombre de la impresora: ");
            fgets(input,20,stdin);
            if((queImp=enLista(input))&gt;=0)
              borrarImpresora(queImp);
            else
              printf("Esa impresora no existe!\n\n");
          }
          else
            printf("La lista de impresoras esta vacia!\n\n");
          break;
        case 6:
          guardarLista();
          printf("Fin del programa. Lista guardada. Adios.\n");
          condicion=0;
          break;
        }//fin del switch
      }//fin del bucle
}//fin de main



int colaLlena(tCola *pcola)
{
  if(pcola-&gt;inicio==((pcola-&gt;final+1)%COLA))
    return 1;
  else
    return 0;
}

int colaVacia(tCola *pcola)
{
  if(pcola-&gt;inicio==pcola-&gt;final)
    return 1;
  else
    return 0;
}

int huecoLibre(void)
{
  int i;
  for(i=0;i&lt;IMPRESORAS;i++)
  {
    if((lista[i].nombre[0])=='\0')
      return i;/*Devuelve el primer hueco libre en la lista*/
  }
  return -1;/*Devuele -1 si esta llena*/
}

int listaVacia(void)
{
  int i;
  for(i=0;i&lt;IMPRESORAS;i++)
  {
    if((lista[i].nombre[0])!='\0')
      return i;/*Devuelve el primer hueco ocupado en la lista*/
    }
  return -1;/*Devuelve -1 si esta vacia*/
}

int listaLlena(void)
{
  int i;
  for(i=0;i&lt;IMPRESORAS;i++)
  {
    if((lista[i].nombre[0])==('\0'))
      return 0;
  }
  return 1;
}

void meterCola(char cadena[], tCola *pcola)
{
  if(!colaLlena(pcola))
  {
    strcpy(pcola-&gt;colaFich[pcola-&gt;final],cadena);
    strcat(pcola-&gt;colaFich[pcola-&gt;final],".txt");
    pcola-&gt;final=((pcola-&gt;final+1)%COLA);
  }
}

int enLista (char buscar[])
{
  int i;
  for(i=0;i&lt;IMPRESORAS;i++)
  {
    if(!(strcmp(lista[i].nombre,buscar)))
      return i;
  }
  return -1;
}

void mandarFicherosPorLote(char *argv[], int n, tImpresora *pimpresora)
{
  int i;
  for(i=0;i&lt;n;i++)
  {
    meterCola(argv[i+1], &amp;pimpresora-&gt;colaImp);
    pimpresora-&gt;pendientes++;
  }
}

void sacarCola(char *ficheroOut, tCola *pcola)
{
  if(!colaVacia(pcola))
  {
    strcpy(ficheroOut,pcola-&gt;colaFich[pcola-&gt;inicio]);
    pcola-&gt;colaFich[pcola-&gt;inicio][0]='\0';
    pcola-&gt;inicio=((pcola-&gt;inicio+1)%COLA);
  }
}

void imprimirCola(tCola *pcola)
{
  int i;
  for(i=0;i&lt;(COLA-1);i++)
  {
    if((pcola-&gt;inicio+i)&lt;COLA)
    {
      printf("\t%d.  ",i);
      puts(pcola-&gt;colaFich[pcola-&gt;inicio+i]);
    }
    else
    {
      printf("\t%d.  ",i);
      puts(pcola-&gt;colaFich[pcola-&gt;inicio-(COLA-i)]);
    }

  }
}

void inicializarCola(tCola *pcola)
{
  int i;
  pcola-&gt;inicio=0;
  pcola-&gt;final=0;
  for(i=0;i&lt;=COLA;i++)
    pcola-&gt;colaFich[i][0]='\0';
}

void inicializarLista(void)
{
  int i;
  for(i=0;i&lt;IMPRESORAS;i++)
  {
    lista[i].nombre[0]='\0';
    lista[i].pendientes=0;
    inicializarCola(&amp;lista[i].colaImp);
  }


}

int guardarLista(void)
{
  FILE *pfich; /* Referencia al fichero */
  char *p;
  int error; /* almacena si ha habido error */
  error=1;


  if ((pfich=fopen("listaImpresoras.bin","w"))!=NULL)
  {
    for(p=(char*)(lista);p&lt;(char*)(((unsigned long)lista)+(IMPRESORAS*sizeof(tImpresora)));p++)
    {
      putc(*p,pfich);
    }
    fclose (pfich);
  }
  else
    error=0;
  return error;
}

int recuperarLista(void)
{
  FILE *pfich; /* Referencia al fichero */
  char *p;
  int error; /* almacena si ha habido error */
  error=1;

  if ((pfich=fopen("listaImpresoras.bin","r"))!=NULL)
  {
    for(p=(char*)(lista);p&lt;(char*)(((unsigned long)(lista))+(IMPRESORAS*sizeof(tImpresora)));p++)
    {
      *p=(char)getc(pfich);
    }
    fclose (pfich);
  }
  else
    error=0;
  return error;
  }

int menu (void)
{
  char opcion[3];
  printf("Menu\nSeleccione una opcion:\n\t1. Agregar impresora\n\t2. Mandar ficheros por lote a una impresora\n\t3. Listar todos los ficheros pendientes de imprimir\n\t4. Imprimir un fichero\n\t5. Borrar una impresora\n\t6. Salir\n ");
  fflush(stdin);
  fgets(opcion,3,stdin);
  return atoi(opcion);
}

void agregarImpresora(int numImpresora)
{
  char input[11];
  int i;

  printf("Impresoras disponibles:\n");
  for(i=0;i&lt;IMPRESORAS;i++)
    printf("\n%s",lista[i].nombre);
  printf("\nIntroduzca un nombre para la impresora: ");
  fgets(input,11,stdin);

  if(enLista(input)&lt;0)
  {
    strncpy(lista[huecoLibre()].nombre,input,10);
  }
  else
    printf("Esa impresora ya esta en la lista!\n\n");
}

void leerFichero(char ficheroOut[13])
{
  FILE *lectura;
  char letra;
  lectura=fopen(ficheroOut,"r");
  if(lectura!=NULL)
  {
    while((letra=(char)fgetc(lectura))!=EOF)
      printf("%c",letra);
    printf("\n\n");
  }
  else
    printf("Error al abrir el archivo.\n");
  fclose(lectura);
}

void borrarImpresora(int queImp)
{
  char sacado[13];

  printf("Borrando impresora %s\n",lista[queImp].nombre);

  lista[queImp].nombre[0]='\0';
  while(lista[queImp].pendientes)
  {
    sacarCola(sacado,&amp;lista[queImp].colaImp);
    printf("Desencolando elemento '%s'\n",sacado);
    leerFichero(sacado);
    lista[queImp].pendientes--;
  }
}
</pre>
Perdonad el posible nivel de spaghetti que pueda haber en el código, en el momento no estaba demasiado familiarizado con las formas estándar de hacer las cosas (y posiblemente ahora tampoco).

El problema de haber usado recursos extraños viene en las funciones <em>int recuperarLista(void)</em> e <em>int guardarLista(void)</em>. La parte de ficheros no la vimos muy en profundidad en las clases de teoría, así que yo la escribí de la forma que consideré que había que hacerlo.

Por ejemplo:
<pre class="theme:solarized-light lang:c decode:true" title="listaImpresorasFicheros.c">int guardarLista(void)
{
  FILE *pfich; /* Referencia al fichero */
  char *p;
  int error; /* almacena si ha habido error */
  error=1;


  if ((pfich=fopen("listaImpresoras.bin","w"))!=NULL)
  {
    for(p=(char*)(lista);p&lt;(char*)(((unsigned long)lista)+(IMPRESORAS*sizeof(tImpresora)));p++)
    {
      putc(*p,pfich);
    }
    fclose (pfich);
  }
  else
    error=0;
  return error;
}</pre>
Procedo a intentar explicarlo. Lo que había que guardar del programa era un array de impresoras (del tipo <em>tImpresora</em>). Entonces, en la función los pasos que sigo son los siguientes:
<ul>
	<li>Abro el fichero para escribir</li>
	<li>Si se abre correctamente hago un bucle <em>for</em> que empieza en el puntero del array y acaba en el puntero resultante de la suma del puntero del array y el tamaño del tipo impresora multiplicado por el número de impresoras. De esta forma recorremos <strong>todo</strong> el array puntero a puntero.</li>
	<li>En cada iteración del <em>for</em> escribo en el fichero un "carácter". Da igual lo que hubiera en esa posición de memoria, yo escribo un carácter porque en C un char ocupa 1 byte exactamente.  Con esto consigo escribir todas las posiciones de memoria del array en el fichero.</li>
	<li>Cierro el fichero y salgo de la función.</li>
</ul>
Con<em> recursos extraños</em> entiendo que el profesor pensaba que lo había copiado, plagiado o que me lo había hecho alguien. Le expliqué cómo funcionaba y cuando vio que lo entendía se dio por satisfecho y consideró que el código era mío, como ciertamente era.
