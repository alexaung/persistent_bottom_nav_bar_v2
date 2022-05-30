var mc_no=0,grX;

function test(){
    return "fist function is called";

}
function test1(){
    return "second function is called";
}
var mc_no=0,grX;
function getCalender() {
	rLang=1;  
	grX=rSetLang(rLang); 
	return rmStr(rLang); 
}
function rmDisp(lang) {
	var rmcalLang,rLang;
	do{
		
		rmcalLang=lang; //get the language to display
		//---------------------------------------------------------------------
		rLang=1;  //language number - default is 1 (Myanmar unicode)
		if (rmcalLang=="my-Mon" || rmcalLang=="my-mon") rLang=3; //Mon language
		else if (rmcalLang=="my-En" || rmcalLang=="my-en") rLang=0; //English
		else if (rmcalLang=="my-Z1" || 
            rmcalLang == "my-z1") rLang = 2; // Zawgyi font
        else if (rmcalLang == "my-Tai" || rmcalLang == "my-tai") rLang = 4; //Tai language
        else if (rmcalLang == "my-Kar" || rmcalLang == "my-kar") rLang = 5; //Tai language
		grX=rSetLang(rLang);  //Initialize the selected language catalog
		//--------------------------------------------------------------------
		
		//if(rLang==3) ormcal.style.fontFamily="Zawgyi-One";
		return rmStr(rLang); //get Myanmar date string to display
	}while(1);
}
function rmStr(rLang) {
	var dt=new Date(); var gy=dt.getFullYear(); var gm=dt.getMonth()+1;
	var gd=dt.getDate(); //get current date -year, month, day
	var js=rg2j(gy,gm,gd); //convert english date to Julian Day Number
	var M=rj2m(js);//calculate Myanmar date

	var str=grX['Sasana Year']+" "+rn2s(M.my+1182)+" "+grX['Ku']+grX[',']+" ";
	str+=grX["Myanmar Year"]+" "+rn2s(M.my)+" "+grX['Ku']+grX[',']+" ";

	var mma=["First Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
			 "Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe","Tabaung"];
	if(M.mmt) str+=grX['Late']; // if Hnaung Tagu or Hnaung Kason
	if(M.myt && M.mm==4) str+=grX['Second']; //if second Waso
	str+=grX[mma[M.mm]]+" ";  //Myanmar month

	var msa=["waxing","full moon","waning","new moon"];
	if (rLang==2) {
		if((M.ms%2)==0) str+=" "+rn2s(M.d)+" ";
		str+=grX[msa[M.ms]];
	} //if Mon language, use different order
	else{
		str+=grX[msa[M.ms]];//Myanmar moon status and day
		if((M.ms%2)==0) str+=" "+rn2s(M.d)+" "+grX['Yat'];}

	var wda=['Saturday','Sunday','Monday','Tuesday','Wednesday',
			 'Thursday','Friday'];
	str+=grX[',']+" "+grX[wda[M.wd]]+grX['Nay']; //weekday

	if((M.md==8)||(M.md==15)||(M.md==23)||(M.md==M.mml))
		str+=grX[',']+" "+grX["Sabbath"]; // Ou-pote
	else if((M.md==7)||(M.md==14)||(M.md==22)||(M.md==(M.mml-1)))
		str+=grX[',']+" "+grX["Sabbath Eve"]; // Aphate

	return str+grX['.']; //return the resulting string
}
function rg2j(gy,gm,gd) {
	var a,y,m;
	a=Math.floor((14-gm)/12);
	y=gy+4800-a;
	m=gm+(12*a)-3;
	return (gd+Math.floor((153*m+2)/5)+(365*y)+Math.floor(y/4)
			-Math.floor(y/100)+Math.floor(y/400)-32045);
}
function rmStr(rLang) {
	var dt=new Date(); var gy=dt.getFullYear(); var gm=dt.getMonth()+1;
	var gd=dt.getDate(); //get current date -year, month, day
	var js=rg2j(gy,gm,gd); //convert english date to Julian Day Number
	var M=rj2m(js);//calculate Myanmar date

	var str=grX['Sasana Year']+" "+rn2s(M.my+1182)+" "+grX['Ku']+grX[',']+" ";
	str+=grX["Myanmar Year"]+" "+rn2s(M.my)+" "+grX['Ku']+grX[',']+" ";

	var mma=["First Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
			 "Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe","Tabaung"];
	if(M.mmt) str+=grX['Late']; // if Hnaung Tagu or Hnaung Kason
	if(M.myt && M.mm==4) str+=grX['Second']; //if second Waso
	str+=grX[mma[M.mm]]+" ";  //Myanmar month

	var msa=["waxing","full moon","waning","new moon"];
	if (rLang==2) {
		if((M.ms%2)==0) str+=" "+rn2s(M.d)+" ";
		str+=grX[msa[M.ms]];
	} //if Mon language, use different order
	else{
		str+=grX[msa[M.ms]];//Myanmar moon status and day
		if((M.ms%2)==0) str+=" "+rn2s(M.d)+" "+grX['Yat'];}

	var wda=['Saturday','Sunday','Monday','Tuesday','Wednesday',
			 'Thursday','Friday'];
	str+=grX[',']+" "+grX[wda[M.wd]]+grX['Nay']; //weekday

	if((M.md==8)||(M.md==15)||(M.md==23)||(M.md==M.mml))
		str+=grX[',']+" "+grX["Sabbath"]; // Ou-pote
	else if((M.md==7)||(M.md==14)||(M.md==22)||(M.md==(M.mml-1)))
		str+=grX[',']+" "+grX["Sabbath Eve"]; // Aphate

	return str+grX['.']; //return the resulting string
}
function rj2m(jd) {
	var SY=1577917828/4320000; //solar year (365.2587565)
	var MO=1954168.050623; //beginning of 0 ME
	var jdn,my,yo,dd,myl,mmt,t,s,c,mm,md,mml,ms,d,wd;

	jdn=Math.round(jd); //convert to integer (i.e. JD to JDN)
	my=Math.floor((jdn-0.5-MO)/SY); //get Myanmar year
	yo=rChkMy(my); //check Myanmar year - watat, big watat,  1st day of Tagu
	dd=jdn-yo.tg1+1; //number of days from 1st Tagu
	myl=354+yo.watat*30+yo.bw; // Myanmar year length
	mmt=Math.floor((dd-1)/myl); // Myanmar year type
	dd-=mmt*myl; t=Math.floor(myl/(dd+266));
	s=29.5+t*yo.bw/5; c=117+t*yo.bw*14/5;//get rate and offset
	dd+=t*266-(1-t)*(myl-266);//modify day count
	mm=Math.floor((dd+c)/s); //get month
	md=dd-Math.floor(s*mm-c-0.1);//get day
	mm=(mm%16); mm-=12*Math.floor(mm/13); //correct month number
	mml=30-mm%2; if(mm==3) mml+=yo.bw;//get length of the month and adjust
	ms=Math.floor((md+1)/16)+Math.floor(md/16)+Math.floor(md/mml);//moon status
	d=md-15*Math.floor(md/16); //get day
	wd=(jdn+2)%7;//get week day
	return {my:my,myt:yo.myt,watat:yo.watat,bw:yo.bw,myl:myl,mm:mm,mmt:mmt,
		mml:mml,md:md,ms:ms,d:d,wd:wd};
}
function rChkMy(my) {
	var yd=0,y1,y2,myt,bw=0,watat,nd,tg1;
	y2=rChkWatat(my); //get watat and 2nd Waso full moon day
	do{ yd++; y1=rChkWatat(my-yd); }while(y1.watat==0);
	watat=y2.watat;  myt=watat;
	if(watat) { nd=(y2.fm-y1.fm)%354; bw=Math.floor(nd/31); myt=bw+1;}
	//if watat check if big watat
	tg1=y1.fm+354*yd-102;	 //get the 1st day of Tagu
	return {myt:myt,watat:watat,bw:bw,tg1:tg1};
}
function rChkWatat(my) {
	var SY=1577917828/4320000; //solar year (365.2587565)
	var LM=1577917828/53433336; //lunar month (29.53058795)
	var MO=1954168.050623; //beginning of 0 ME
	var ed,NM,TA,TW,watat=0,w2fm,yr,WO=0;
	ed=(SY*(my+3739))%LM; //find excess days
	NM=8; // number of months to ahead for full excess month
	TA=(SY/12-LM)*(12-NM); //threshold to adjust excess day
	if(ed<TA) ed+=LM; //adjust excess day
	TW=LM-(SY/12-LM)*NM;  //threshold for taking the year as watat
	if(ed>=TW) watat=1;
	WO-=4/NM; //offset for full moon day
	if (my==1377) WO+=1; if (my==1344) watat=1; else if (my==1345) watat=0;
	w2fm=Math.round(SY*my+MO-ed+4.5*LM+WO); //full moon day of 2nd Waso
	return {watat:watat,fm:w2fm};
}
function rn2s(n) {
	var r,s=""; n=Math.floor(n);
	do{
		r=n%10; n=Math.floor(n/10);
		s=grX[r.toString()]+s;
	}while(n>0);
	return s;
}
function rSetLang(lang) 
{
	if (lang==0) { //Catalog for  English Language
	return {'First Waso':'First Waso','Tagu':'Tagu','Kason':'Kason',
	'Nayon':'Nayon','Waso':'Waso',	'Wagaung':'Wagaung','Tawthalin':'Tawthalin',
	'Thadingyut':'Thadingyut','Tazaungmon':'Tazaungmon','Nadaw':'Nadaw',
	'Pyatho':'Pyatho','Tabodwe':'Tabodwe','Tabaung':'Tabaung',
	'waxing':'waxing','waning':'waning','full moon':'full moon',
	'new moon':'new moon','Sasana Year':'Sasana Year',
	'Myanmar Year':'Myanmar Year','Ku':' ','Late':'Late ','Second':'Second ',
	'Sunday':'Sunday','Monday':'Monday','Tuesday':'Tuesday',
	'Wednesday':'Wednesday','Thursday':'Thursday','Friday':'Friday',
	'Saturday':'Saturday','Nay':' ','Yat':' ','Sabbath Eve':'Sb Eve',
	'Sabbath':'Sabbath','0': '0','1': '1','2': '2','3': '3','4': '4','5': '5',
	'6': '6','7': '7','8': '8','9': '9',',':',','.':'.'};}

	else if (lang==3) { //Catalog for Mon Language  using Unicode,
	//Mon Language Translation by: 'ITVilla' : http://it-villa.blogspot.com/,
	//Proof reading: Mikau Nyan
	return {'First Waso':'ဂိတုပ-ဒ္ဂိုန်','Tagu':'ဂိတုစဲ','Kason':'ဂိတုပသာ်','Nayon':'ဂိတုဇှေ်',
	'Waso':'ဂိတုဒ္ဂိုန်','Wagaung':'ဂိတုခ္ဍဲသဳ','Tawthalin':'ဂိတုဘတ်','Thadingyut':'ဂိတုဝှ်',
	'Tazaungmon':'ဂိတုက္ထိုန်','Nadaw':'ဂိတုမြေက္ကသဵု','Pyatho':'ဂိတုပှော်','Tabodwe':'ဂိတုမာ်',
	'Tabaung':'ဂိတုဖဝ်ရဂိုန်','waxing':'မံက်','waning':'စွေက်','full moon':'ပေၚ်',
	'new moon':'အိုတ်','Sasana Year':'သက္ကရာဇ် သာသနာ','Myanmar Year':'သက္ကရာဇ်ဍုၚ်',
	'Ku':'သၞာံ','Late':'','Second':'ဒု','Sunday':'တ္ၚဲအဒိုတ်','Monday':'တ္ၚဲစန်',
	'Tuesday':'တ္ၚဲအင္ၚာ','Wednesday':'တ္ၚဲဗုဒ္ဓဝါ','Thursday':'တ္ၚဲဗြဴဗတိ','Friday':'တ္ၚဲသိုက်',
	'Saturday':'တ္ၚဲသ္ၚိသဝ်','Nay':'','Yat':'','Sabbath Eve':'တ္ၚဲတိၚ်','Sabbath':'တ္ၚဲသဳ',
	'0': '၀','1': '၁','2': '၂','3': '၃','4': '၄','5': '၅','6': '၆','7': '၇',
	'8': '၈','9': '၉',',':'၊','.':'။'};}

	else if (lang==2) { //Catalog for Zawgyi-One
	return {'First Waso':'ပဝါဆို','Tagu':'တန္ခူး','Kason':'ကဆုန္','Nayon':'နယုန္',
	'Waso':'ဝါဆို','Wagaung':'ဝါေခါင္','Tawthalin':'ေတာ္သလင္း','Thadingyut':'သီတင္းကြ်တ္',
	'Tazaungmon':'တန္ေဆာင္မုန္း','Nadaw':'နတ္ေတာ္','Pyatho':'ျပာသို','Tabodwe':'တပို႔တြဲ',
	'Tabaung':'တေပါင္း','waxing':'လဆန္း','waning':'လဆုတ္','full moon':'လျပည့္',
	'new moon':'လကြယ္','Sasana Year':'သာသနာႏွစ္','Myanmar Year':'ျမန္မာႏွစ္','Ku':'ခု',
	'Late':'ေႏွာင္း','Second':'ဒု','Sunday':'တနဂၤေႏြ','Monday':'တနလၤာ',
	'Tuesday':'အဂၤါ','Wednesday':'ဗုဒၶဟူး','Thursday':'ၾကာသပေတး','Friday':'ေသာၾကာ',
	'Saturday':'စေန','Nay':'ေန႔','Yat':'ရက္','Sabbath Eve':'အဖိတ္','Sabbath':'ဥပုသ္',
	'0': '၀','1': '၁','2': '၂','3': '၃','4': '၄','5': '၅','6': '၆','7': '၇',
            '8': '၈', '9': '၉', ',': '၊', '.': '။'
        };
    }

    else if (lang == 4) {	//Catalog for Tai
        return {
            'First Waso': 'ပပႅတ်ႇ', 'Tagu': 'ႁႃႈ', 'Kason': 'ႁူၵ်း', 'Nayon': 'ၸဵတ်း',
            'Waso': 'ပႅတ်ႇ', 'Wagaung': 'ၵဝ်ႈ', 'Tawthalin': 'သိပ်း',
            'Thadingyut': 'သိပ်းဢဵတ်း', 'Tazaungmon': 'သိပ်းသွင်', 'Nadaw': 'ၸဵင်', 'Pyatho': 'ၵမ်',
            'Tabodwe': 'သၢမ်', 'Tabaung': 'သီႇ',
            'waxing': 'လိူၼ်မႂ်ႇ', 'waning': 'လိူၼ်လွင်ႈ', 'full moon': 'လိူၼ်မူၼ်း', 'new moon': 'လိူၼ်လပ်း',
            'Sasana Year': 'ပီသႃႇသၼႃႇ', 'Myanmar Year': 'ပီ​​ၵေႃးၸႃႇ', 'Ku': 'ၶု', 'Late': 'ဝၢႆး',
            'Second': 'ဒု', 'Sunday': 'ဝၼ်းဢႃးတိတ်ႉ', 'Monday': 'ဝၼ်းၸၼ်', 'Tuesday': 'ဝၼ်းဢၢင်းၵၢၼ်း',
            'Wednesday': 'ဝၼ်းပုတ်ႉ', 'Thursday': 'ဝၼ်းၽတ်း', 'Friday': 'ဝၼ်းသုၵ်း', 'Saturday': 'ဝၼ်းသဝ်',
            'Nay': 'ဝၼ်း', 'Yat': 'ဝၼ်း', 'Sabbath Eve': 'ၽိတ်ႈ', 'Sabbath': 'သိၼ်',
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7',
            '8': '8', '9': '9', ',': '၊', '.': '။'
        };
    }

    else if (lang == 5) {	//Catalog for S'gaw Karen
        return {
            'First Waso': 'ပလါဃိး', 'Tagu': 'လါချံ', 'Kason': 'ဒ့ၣ်ညါ', 'Nayon': 'လါနွံ',
            'Waso': 'လါဃိး', 'Wagaung': 'လါခူး', 'Tawthalin': 'ဆံးမုၢ်',
            'Thadingyut': 'ဆံးဆၣ်', 'Tazaungmon': 'လါနီ', 'Nadaw': 'လါပျုၤ', 'Pyatho': 'သလ့ၤ',
            'Tabodwe': 'ထ့ကူး', 'Tabaung': 'သွ့ကီ',
            'waxing': 'လါထီၣ်', 'waning': 'လါလီၤ', 'full moon': 'လါပှဲၤ', 'new moon': 'လါဘၢ',
            'Sasana Year': 'နံၣ်သာသနာ', 'Myanmar Year': 'နံၣ်မြန်မာ', 'Ku': 'ခု', 'Late': 'စဲၤ',
            'Second': '၂ ', 'Sunday': 'မုၢ်ဒဲး', 'Monday': 'မုၢ်ဆၣ်', 'Tuesday': 'မုၢ်ယူာ်',
            'Wednesday': 'မုၢ်ပျဲၤ', 'Thursday': 'မုၢ်လ့ၤဧိၤ', 'Friday': 'မုၢ်ဖီဖး', 'Saturday': 'မုၢ်ဘူၣ်',
            'Nay': 'နံၤ', 'Yat': 'ရက်', 'Sabbath Eve': 'အဖိတ်', 'Sabbath': 'အိၣ်ဘှံး',
            '0': '၀', '1': '၁', '2': '၂', '3': '၃', '4': '၄', '5': '၅', '6': '၆', '7': '၇',
            '8': '၈', '9': '၉', ',': '၊', '.': '။'
        };
    }

	else {	//Catalog for Myanmar Unicode
	return {'First Waso':'ပဝါဆို','Tagu':'တန်ခူး','Kason':'ကဆုန်','Nayon':'နယုန်',
	'Waso':'ဝါဆို','Wagaung':'ဝါခေါင်','Tawthalin':'တော်သလင်း',
	'Thadingyut':'သီတင်းကျွတ်','Tazaungmon':'တန်ဆောင်မုန်း','Nadaw':'နတ်တော်','Pyatho':'ပြာသို',
	'Tabodwe':'တပို့တွဲ','Tabaung':'တပေါင်း',
	'waxing':'လဆန်း','waning':'လဆုတ်','full moon':'လပြည့်','new moon':'လကွယ်',
	'Sasana Year':'သာသနာနှစ်','Myanmar Year':'မြန်မာနှစ်','Ku':'ခု','Late':'နှောင်း',
	'Second':'ဒု','Sunday':'တနင်္ဂနွေ','Monday':'တနင်္လာ','Tuesday':'အင်္ဂါ',
	'Wednesday':'ဗုဒ္ဓဟူး','Thursday':'ကြာသပတေး','Friday':'သောကြာ','Saturday':'စနေ',
	'Nay':'နေ့','Yat':'ရက်','Sabbath Eve':'အဖိတ်','Sabbath':'ဥပုသ်',
	'0': '၀','1': '၁','2': '၂','3': '၃','4': '၄','5': '၅','6': '၆','7': '၇',
	'8': '၈','9': '၉',',':'၊','.':'။'};}
}