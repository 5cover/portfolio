# Astro bugs found

- bug in renames of files : sometimes misrenames files (to reproduce)
- bug in parsing of front matter `const x = <T>(x:T)=>{};`: `<T>` parsed as element
- string union properties not typechecked
- to test: `{<div/><div/>} and {<><div/><div/></>}` equivalent, including in a subfunction?
