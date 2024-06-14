let a=new Array();

let arr=document.querySelector(".container");
let size=document.querySelector(".len");
let len=size.value;
let changeBtn=document.querySelector(".change");
let bubble =document.querySelector(".bubble");
let selection=document.querySelector(".selection");
let insertion=document.querySelector(".insertion");
let merge=document.querySelector(".merge");
let quick=document.querySelector(".quick");


merge.addEventListener("click",mergeHelper);
bubble.addEventListener("click",bubbleSort);
selection.addEventListener("click",selectionSort);
insertion.addEventListener("click",insertionSort);
quick.addEventListener("click", printArray);

changeBtn.addEventListener("click", () => {
    clearArray();
    addElements();
})

size.addEventListener("input", () => {
    len=size.value;
    document.querySelector(".lenVal").innerHTML=len;
    clearArray();
    addElements();
}
);

function clearArray() {
    arr.innerHTML="";
    a=[];
}

function addElements() {
    let k=len;
    while(k-->0){
        let bar=document.createElement("div");
        bar.classList.add("bar");
        const height=Math.round((Math.random()*500)+10);
        bar.style.height= height + "px";
        a.push(height);
        arr.appendChild(bar);
    }
}
clearArray();
addElements();

function success() {
    for (let i = 0; i < len; i++) {
        arr.children[i].style.background = "yellowgreen";
    }
}


function printArray(){
    console.log("array is:");
    // let ans="";
    for (let i = 0; i < len; i++) {
        console.log(a[i]);
        // ans+=a[i];
        // ans+=" ";
    }
    // console.log(ans);
}


async function bubbleSort(){
    for (let i = 0; i < len-1; i++) {
        let c=0;
        for (let j = 0; j < len-1-i; j++) {
            // await new Promise(resolve => setTimeout(resolve,50));
            if(a[j] > a[j+1]){
                await swap(j,j+1);
                c++;
            }
        }
        arr.children[len-1-i].style.background = "yellowgreen";
        if(c==0) break;        
    }
    success(); 
}


async function selectionSort(){
    for (let i = 0; i < len; i++) {
        
        let min=i;
        arr.children[i].style.background = "yellow";
        await new Promise(resolve => setTimeout(resolve,100));
        for (let j = i+1; j <len; j++) {
            if(a[j]<a[min]){
                arr.children[min].style.background = "white";
                arr.children[j].style.background = "yellow";
                min=j;
            }
        }
        await swap(i,min);
        arr.children[i].style.background = "yellowgreen";
    }
    // await new Promise(resolve => setTimeout(resolve,100/len));
    success();
}

async function mergeHelper(){
    await mergeSort(a,0,len-1);
    success();
}


async function merger(a, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = new Array(n1); 
    var R = new Array(n2);

    for (var i = 0; i < n1; i++)
        L[i] = a[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = a[m + 1 + j];

    var i = 0;
    var j = 0;
    var k = l;
    while (i < n1 && j < n2) {
        
        if (L[i] <= R[j]) {
            a[k] = L[i];
            arr.children[k].style.height= L[i]+"px";
            i++;
        }
        else {
            a[k] = R[j];
            arr.children[k].style.height= R[j]+"px";
            j++;
        }
        arr.children[k].style.background = "yellow";
        await new Promise(resolve => setTimeout(resolve,100));
        arr.children[k].style.background = "white";
        k++;
    }

    while (i < n1) {
        a[k] = L[i];
        arr.children[k].style.height= L[i]+"px";
        i++;
        k++;
    }

    while (j < n2) {
        a[k] = R[j];
        arr.children[k].style.height= R[j]+"px";
        j++;
        k++;
    }
}
async function mergeSort(a,l, r){
    if(l>=r){
        return;
    }
    var m =l+ parseInt((r-l)/2);
    await mergeSort(a,l,m);
    await mergeSort(a,m+1,r);
    await merger(a,l,m,r);
    await new Promise(resolve => setTimeout(resolve,(l-r)*20));
}

async function insertionSort(){
    arr.children[0].style.background = "yellowgreen";
    for (let i = 1; i < len; i++) {
        let p=arr.children[i].style.height;
        let k=a[i];
        let j=i-1;
        while(j>=0 && a[j]>k){
            a[j+1]=a[j];
            arr.children[j+1].style.height=arr.children[j].style.height;
            j--;
        }
        a[j+1]=k;
        arr.children[j+1].style.height=p;
        arr.children[j+1].style.background = "red";
        await new Promise(resolve => setTimeout(resolve,100));
        arr.children[j+1].style.background = "yellowgreen";
        arr.children[i].style.background = "yellowgreen";
    }
}



function swap(first,second){
    return new Promise((resolve) => {
        arr.children[first].style.background = "red";
        arr.children[second].style.background = "red";
        let p=arr.children[first].style.height;
        let q=a[first];
        a[first]=a[second];
        arr.children[first].style.height=arr.children[second].style.height;
        a[second]=q;
        arr.children[second].style.height=p;
        setTimeout(()=>{
            arr.children[first].style.background = "white";
            arr.children[second].style.background = "white";
            resolve(true) 
        },100/len);
    })
}