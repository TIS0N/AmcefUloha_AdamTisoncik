const { group } = require('console');
const fs = require('fs');

function getDate(number){
    const date = new Date(number);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day =  date.getDate();
    return `${day}.${month}.${year}`;
}

fs.readFile('data.json', 'utf8', (err, data) => {
    if(err){
        console.error("Error reading JSON file:", err);
        return;
    }
    const jsonData = JSON.parse(data);

    const result = jsonData
        .filter(item => item.state === "canceled")
        .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        .reduce((acc, item) => {
            const year = new Date(item.createdAt).getFullYear();
            if(!acc[year]) acc[year] = [];
            acc[year].push({
                createdAt: getDate(item.createdAt),
                state: item.state,
            });
            return acc;
        },{});

    console.log(JSON.stringify(result, null, 2));
});
