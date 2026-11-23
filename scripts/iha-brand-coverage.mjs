import {readdir,readFile} from "node:fs/promises";
import path from "node:path";
async function scan(root){
 let found=[];
 for(const ent of await readdir(root,{withFileTypes:true})){
  if(ent.name.startsWith(".")||["node_modules","test-artifacts"].includes(ent.name))continue;
  const p=path.join(root,ent.name);
  if(ent.isDirectory())found.push(...await scan(p));
  else if(ent.name.endsWith(".html"))found.push(p);
 }
 return found;
}
let covered=0,redirect=0,uncovered=[];
for(const file of await scan(".")){
 const s=await readFile(file,"utf8");
 if(/http-equiv=["']refresh["']/.test(s)){redirect++;continue;}
 if(/count\.js|iha-experience\.js|iha-brand-system\.js/.test(s)){covered++;continue;}
 uncovered.push(file);
}
console.log(JSON.stringify({htmlCovered:covered,redirects:redirect,uncovered},null,2));
if(uncovered.length)process.exitCode=1;