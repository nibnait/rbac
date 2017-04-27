function onkeydown(){
			var olist=document.getElementById('list');
			var aul=olist.getElementsByTagName('ul');
			var onav=document.getElementById('nav');
			var aimg=onav.getElementsByTagName('img');
			var i=0;
			
			
			document.onkeydown=function(ev){
				var oEvent=ev||event;
				if(oEvent.keyCode==38){

						if(i==0){
						for(var j=0;j<aimg.length;j++)
								aimg[j].src='images/button_0'+(j+1)+'.png';
								aimg[0].src='images/button_h_01.png';


							for(var k=0;k<aul.length;k++)
								aul[k].style.display='none';
								aul[0].style.display='block';

							
						}

						else{
							--i;
							for(var j=0;j<aimg.length;j++)
									aimg[j].src='images/button_0'+(j+1)+'.png';
									aimg[i].src='images/button_h_0'+(i+1)+'.png';



							for(var k=0;k<aul.length;k++)
								aul[k].style.display='none';
								aul[i].style.display='block';

							}
							

					}

					if(oEvent.keyCode==40){
						if(i==5){
							for(var j=0;j<aimg.length;j++)
									aimg[j].src='images/button_0'+(j+1)+'.png';
									aimg[5].src='images/button_h_06.png';



									for(var k=0;k<aul.length;k++)
										aul[k].style.display='none';
										aul[5].style.display='block';

									
								}

						else{
							++i;
							for(var j=0;j<aimg.length;j++)
								aimg[j].src='images/button_0'+(j+1)+'.png';

								aimg[i].src='images/button_h_0'+(i+1)+'.png';


							for(var k=0;k<aul.length;k++)
								aul[k].style.display='none';
								aul[i].style.display='block';

						}

					}




				
			
			}
}
			
			
		