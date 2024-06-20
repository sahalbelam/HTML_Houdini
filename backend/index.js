const axios = require('axios');
const cheerio  = require('cheerio');

async function kar(seatNo){
    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://ums.cvmu.ac.in/GenerateResultHTML/2722/'+ seatNo + '.html',
    headers: { 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
        'Accept-Language': 'en-US,en;q=0.8', 
        'Cache-Control': 'max-age=0', 
        'Connection': 'keep-alive', 
        'Cookie': '.ASPXFORMSAUTH=5ED160CCDD54C2301E7ADA06AED3824A05E7A7B82A9BFD2924B292663960AADAFDB708930F181E0EC774330929DF46E5AEFB0944B7F6EE333C1381CF118A03B88A331E5A10342F034DFC149A473837A78589FC3F518B49C877E2F000E014868113A63D43488DCD264A7858E43D4C5389E238D889DDFA5DC4D090D50A8DCA1F39A021E0898C0ED36B3AE8DBFF2156DC4BBD8EB3EF3FA344DFEEBCC4CA8B88D65CDBB913BEA4C2A8F2B363D17E26DDB8B6FE6B7AFF6C21EE37D171CF82A3E274A295187E59192A876AE757C65671FA1DE93ABB006962D075CAEC5075C9C58FB9BEF272A5A5', 
        // 'If-Modified-Since': 'Fri, 31 May 2024 11:02:33 GMT', 
        // 'If-None-Match': '"3eb0ae94ab3da1:0"', 
        'Sec-Fetch-Dest': 'document', 
        'Sec-Fetch-Mode': 'navigate', 
        'Sec-Fetch-Site': 'cross-site', 
        'Sec-Fetch-User': '?1', 
        'Sec-GPC': '1', 
        'Upgrade-Insecure-Requests': '1', 
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36', 
        'sec-ch-ua': '"Brave";v="125", "Chromium";v="125", "Not.A/Brand";v="24"', 
        'sec-ch-ua-mobile': '?1', 
        'sec-ch-ua-platform': '"Android"'
    }
    };

    const response = await axios.request(config)

    const parsedData = parsehtml((response.data))
    if(parsedData){
        // console.log("studentName:  " + parsedData.studentName)
        // console.log("SGPA:  " + parsedData.SGPA)
        // console.log("------------------------------------------")
        return{
            studentName: parsedData.studentName,
            collegeName: parsedData.collegeName,
            SGPA: parsedData.SGPA
        }
    }
}

function parsehtml(htmlContent){
    const $ = cheerio.load(htmlContent)

    const studentName = $('td:contains("Student Name:")').next('td').text().trim() || 'N/A'
    const collegeName = $('td:contains("College Name:")').next('td').text().trim() || 'N/A'

    let SGPA = 'N/A';
    // Extract SGPA from the text content of the cell
    $('td:contains("SGPA :")').each((index, element) => {
        const sgpaText = $(element).text().trim();
        const match = sgpaText.match(/SGPA :\s*([\d.]+)/);
        if (match) {
            SGPA = match[1];
        }
    });
    // console.log({
    //     studentName,
    //     SGPA
    // })
    if (SGPA == "N/A"){
        return null
    }
    return {
        studentName,
        collegeName,
        SGPA
    }
}

// async function call(){
//     for (let i=6208163; i<=6208190; i++){
//         try{
//             await kar(i.toString())
//         }
//         catch(err){         
//             console.error("some error happened processing the enrollment "+ i)
//             console.log("------------------------------------------")
//         }  
//     }
// }

// call()

module.exports = {
    kar
}
// kar("6208163")