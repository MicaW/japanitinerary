/* BOOKING CONFIRMATIONS — 17 Sep 2026.
   Each link is a Google Doc in Mica's Drive folder "Japan Bookings" (PDF copies in Documents/Claude/Projects/Japan/Bookings).
   The docs are private to micawhitby@gmail.com: the links are public here, but they only open when signed in to that Google account.
   To give Dad access, share the docs (or the folder) with his Google account — do not switch them to "anyone with the link". */
(function(){
const D={
 "flight_out": "1Vz_SFrrz_awhdzpve3kzpO7O8v-fItvLvwy7ZIaZH6M",
 "henn1": "1LcKDbMAV4ZVRQrKIeACBrJkYMcrmpjIyLY1ozk8Bu0c",
 "haruka": "1b66naATXErvSOxtu833zhtUOikUwBteqe4Z3fF3IW7I",
 "zazen": "1FPylwjMef-3RpoBs2BVR6ngcAKmtd6wb-8FN57196V8",
 "manryo": "1mYN-Pke5wNsJk1kMtutfdwkY7tR7JG-gNH10QrkBtLE",
 "hoshinoya": "1tORglM5Es7BvzlTagABxUpRfvhVhFURA5c-3fuCf6so",
 "boat": "1bgelGe42Wj9gwjV769t38IoWs-zng91XlmxGIMH51dE",
 "miyabi": "1ZQQ15T7vd7ZC6c8Dn4Jte6AQpNVShEZSOxCubxhDQHU",
 "hashidate5": "1S4GF924oFhPFbnjHdc7g-v6YUhlztgFzYcsnEw_4GYw",
 "henn2": "10gTT_Z7fcz92p5hH2O4cTTv-cKzzaK_VsGBODdJjUas",
 "hashidate2": "1Vat6F7_mX1ZSZ2FZ73uH_GmKIn3L3l-QAaOFCUVEQzk",
 "aoniyoshi": "1sG45iwFPCMWBUunckZXX3JQpcs7SNpoKH-Z_TdlQqso",
 "yuian": "1t5J8osAYIzsd4jRDZ1eXAFcGzwxGG8OcaXkL-73iU4s",
 "nozomi22": "1P4xBHF3jLQ7pSOWSxioDUP79bEJn5iMH9Uy1tRK3DC0",
 "shinano17": "1nzkwKIVBz7sAOTNJStEH-To15KV2ojitbRTaCKFaSYA",
 "mountainn": "15uEzUDUwHsk0fCrrHWodo3_J-WpNyRGBV7KR4Kcwd-w",
 "uplace": "1dABA2d96G3KsHPPV1sO-K_xeqGQ8ejXIVSdQSuLDW9U",
 "shinano2": "1FaE64ch8bWOHK4bwMgV0IoMyJirIJl7GuBPBhFPmZKE",
 "nozomi122": "1D0iECABxjmFUBaU00CBf6iPeAYoPkZuBMlHRMN3lvNg",
 "teamlab": "1GvKpJiVT6gah-VhT0NGTem9mOkErKuhaiitPTMG9ueI"
};
const C={};
Object.keys(D).forEach(function(k){ C[k]='https://docs.google.com/document/d/'+D[k]+'/edit'; });
window.CONF=C;
/* travel legs: [day id, regex on service+route, key] */
const LEGS=[
 ['18-sep',/air china/i,'flight_out'],
 ['19-sep',/haruka/i,'haruka'],
 ['23-sep',/hoshinoya/i,'boat'],
 ['25-sep',/hashidate 5/i,'hashidate5'],
 ['27-sep',/hashidate 2/i,'hashidate2'],
 ['27-sep',/aoniyoshi/i,'aoniyoshi'],
 ['28-sep',/nozomi/i,'nozomi22'],
 ['28-sep',/shinano 17/i,'shinano17'],
 ['1-oct',/shinano 2\b/i,'shinano2'],
 ['1-oct',/nozomi/i,'nozomi122'],
 ['5-oct',/ba6|british airways/i,'MISSING']
];
const HOTELS={'19-sep':'henn1','20-sep':'henn1','21-sep':'henn1','22-sep':'henn1','23-sep':'hoshinoya','24-sep':'hoshinoya','25-sep':'miyabi','26-sep':'miyabi','27-sep':'henn2','28-sep':'yuian','29-sep':'mountainn','30-sep':'mountainn','1-oct':'uplace','2-oct':'uplace','3-oct':'uplace','4-oct':'uplace'};
/* booked experiences, shown in the tour-at-a-glance table and on their day */
window.BOOKED_FUN=[
 {id:'20-sep',what:'Daisen-in zazen',detail:'16:30 · Daitoku-ji · arrive ~16:00',key:'zazen'},
 {id:'21-sep',what:'Manryo cooking class',detail:'12:30 · ramen, gyoza + onigiri · pay on the day',key:'manryo'},
 {id:'23-sep',what:'HOSHINOYA shuttle boat',detail:'14:50 from the Togetsukyo boat lounge',key:'boat',kind:'transfer'},
 {id:'4-oct',what:'teamLab Borderless',detail:'10:30–11:00 entry · Azabudai Hills',key:'teamlab'}
];
/* confFor('travel', dayId, text) / confFor('hotel', dayId) / confFor('key', name)
   returns a URL, 'MISSING' (booked but no confirmation found), or '' (nothing to confirm) */
window.confFor=function(kind,a,b){
  if(kind==='key') return C[a]||'';
  if(kind==='hotel') return HOTELS[a]?C[HOTELS[a]]:'';
  for(let i=0;i<LEGS.length;i++){ const L=LEGS[i]; if(L[0]===a&&L[1].test(b||'')) return L[2]==='MISSING'?'MISSING':C[L[2]]; }
  return '';
};
window.confLink=function(u,big){
  if(!u) return '';
  if(u==='MISSING') return big?'<span class="btn mini" style="opacity:.6">📄 CONFIRMATION NOT FOUND YET</span>':'<span class="docx" title="Booked, but no confirmation found yet">—</span>';
  return big?'<a class="btn mini yellow" target="_blank" rel="noopener" href="'+u+'">📄 BOOKING CONFIRMATION</a>'
            :'<a class="doc" target="_blank" rel="noopener" href="'+u+'" onclick="event.stopPropagation()" title="Booking confirmation (Google Doc)">📄</a>';
};
})();
