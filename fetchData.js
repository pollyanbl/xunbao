async function fetchLibraryInfo() {  
    const response = await fetch('library.txt');  
    if (!response.ok) throw new Error('无法加载图书馆信息');  
    return await response.text();  
}  

async function fetchTempleInfo() {  
    const response = await fetch('temple.txt');  
    if (!response.ok) throw new Error('无法加载神庙信息');  
    return await response.text();  
}  

async function fetchGuardInfo() {  
    const response = await fetch('guard.txt');  
    if (!response.ok) throw new Error('无法加载守卫信息');  
    return await response.text();  
}  