---
layout: post
title: A(n) (not so) epic tale of electronic design
date:   2016-12-22 02:15:28
categories: []
tags: [ETSIST]
fullview: true
comments: true
---

Sometimes I amaze myself. Even for good. The ability us engineering stundets have to image something and just do it is awesome.

Last year we found ourselves organising the Sphera event[1]. The presidents of all the student groups in the school had reunited to figure out the timetables and space for the venue in the freezers[2]. AETEL had three activities: a minisumo robot competition[3], a demo flight of our quadcopter and a workshop for arduino beginners.


If you make an analysis of our planned activities you may realise none of them required the participants to be very active. In fact, the only activity that implied building was the sumobot competition and the participants had to do all on their own…

Being our Society about doing stuff and teaching stuff I decided to find a remedy for this problem. People had to build something. I wanted them to know the feeling of assembling something with your own hands, testing it, making it work and knowing you did it with your own effort. I came to the conclusion that getting together a kit to solder would be nice and Carlos Berbell helped me settle on a Persistence of View display. The idea was to put together a simple kit that would draw some attention for people to assemble for free any time during the Sphera event.

I did the electronic design on a piece of paper while checking the pinout of the ATtiny85 on google. We didn’t have much time, so I asked Carlos to design the printed circuit board because I’m not super skilled with board design and I would have taken too long. I sent him the schematic and the drawings for the board and he did the design.

<img src="/images/pocketpov/photo1.jpg" alt="pcb_pocketPOV"/>
**PCB AETEL pocket PoV**

We were running against the clock, we had to leave to Elche for IEEE National Student Branch Congress[4] but we managed to find some time to order the boards on Elecrow[5], the components on Farnell[6] and the batteries.

After a nice weekend with fantastic people in Elche and having made a lot of networking and friends, we came back to Campus Sur just in time for Sphera. Luckily Jota had done all the drone stuff and Carlos had the arduino talk prepared, that allowed me to center completely on the PoV display.

<img src="/images/pocketpov/photo2.jpg" alt="pocketPOV"/>
**Completely assembled**

Since we had to do everything so quick, while preparing many other activities and even being a few hundred kilometers away, we hadn’t had much time to test the design. In fact, we hadn’t even built a single prototype. I know, I know, right now you are thinking: “what engineer manufactures something before even prototyping? Things should go the other way around” and I agree with you, but sometimes you’ve got to do what you’ve got to do. We didn’t have time to test and the design was very simple, so we decided to take the chance and it worked in the end. The assembly of the first unit was easy and didn’t take long, programming, however, was more complicated.

<img src="/images/pocketpov/photo3.jpg" alt="WorkingPOV"/>
**Demonstration of AETEL pocket PoV**

I had no previous experience with ATMEL microprocessors out of common arduino things, and the first thing I had to do was put together an ad hoc programmer with an arduino UNO and a few cables, then I installed the descriptors for this microcontroller and then fight with the code until it worked. Making the thing work as a PoV display was not difficult, the difficult part was putting the chip to sleep so it didn’t kill the battery while waiting for a user to press the button, all this in a few hours and with little (or no) previous experience.

Fortunately, everything worked out in the end and around 50 students of the school were able to enjoy the experience of assembling something with their own hands.

This article was published in the 16th number of TelekoSur, the ETSIST’s Student Union magazine. It was originally written in Spanish, translation losses may have occurred.

Sphera is a week long event organised by the student groups of ETSIST with lots of fun activities.
The freezers (“las neveras”) are the exam halls of the school. They have this nickname because they are completely white and it’s freezing cold inside.
Sumobots are fighting robots that try to push each other out of a Dojo.
IEEE National Student Branch Congress (Congreso Nacional de Ramas de Estudiantes del IEEE) is a gathering of student members of IEEE in Spain. Each year is organised by a different Student Branch and this year it was Universidad Miguel Hernández turn.
Elecrow is an elctronic shop in Shenzen, China. Cheap PCBs can be acquired here.
Farnell is a distributor of electronic parts based in United Kingdom.
