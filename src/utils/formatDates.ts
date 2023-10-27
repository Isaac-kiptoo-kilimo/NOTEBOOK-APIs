
export function formateDates(){
    let date=new Date();
    let newDate=date.toLocaleString()
    console.log(newDate)
    return newDate
}

formateDates();