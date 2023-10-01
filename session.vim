let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/code/whatsapp-chatbot-fronted/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +1 App.js
badd +1 components/ContentType.js
badd +1 nodes/Messages.js
badd +1 store.js
badd +1 initialData.js
badd +1 components/content-type.css
badd +1 index.js
badd +1 App.css
argglobal
%argdel
$argadd App.js
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit App.js
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 90 + 90) / 181)
exe '2resize ' . ((&lines * 18 + 24) / 49)
exe 'vert 2resize ' . ((&columns * 90 + 90) / 181)
exe '3resize ' . ((&lines * 27 + 24) / 49)
exe 'vert 3resize ' . ((&columns * 90 + 90) / 181)
argglobal
balt App.css
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
35,51fold
let &fdl = &fdl
let s:l = 54 - ((40 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 54
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("index.js", ":p")) | buffer index.js | else | edit index.js | endif
balt App.css
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 9 - ((3 * winheight(0) + 9) / 18)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 9
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("App.css", ":p")) | buffer App.css | else | edit App.css | endif
balt index.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 39 - ((24 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 39
normal! 025|
wincmd w
3wincmd w
exe 'vert 1resize ' . ((&columns * 90 + 90) / 181)
exe '2resize ' . ((&lines * 18 + 24) / 49)
exe 'vert 2resize ' . ((&columns * 90 + 90) / 181)
exe '3resize ' . ((&lines * 27 + 24) / 49)
exe 'vert 3resize ' . ((&columns * 90 + 90) / 181)
tabnext
edit components/ContentType.js
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 90 + 90) / 181)
exe 'vert 2resize ' . ((&columns * 90 + 90) / 181)
tcd ~/code/whatsapp-chatbot-fronted/src/components
argglobal
balt ~/code/whatsapp-chatbot-fronted/src/components/content-type.css
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
7,14fold
16,45fold
47,55fold
57,64fold
66,66fold
66,73fold
75,111fold
113,119fold
121,129fold
131,150fold
161,168fold
153,171fold
let &fdl = &fdl
47
normal! zo
66
normal! zo
66
normal! zc
75
normal! zo
153
normal! zo
161
normal! zo
let s:l = 54 - ((51 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 54
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("~/code/whatsapp-chatbot-fronted/src/components/content-type.css", ":p")) | buffer ~/code/whatsapp-chatbot-fronted/src/components/content-type.css | else | edit ~/code/whatsapp-chatbot-fronted/src/components/content-type.css | endif
balt ~/code/whatsapp-chatbot-fronted/src/components/ContentType.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 13 - ((12 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 13
normal! 0
wincmd w
exe 'vert 1resize ' . ((&columns * 90 + 90) / 181)
exe 'vert 2resize ' . ((&columns * 90 + 90) / 181)
tabnext
edit ~/code/whatsapp-chatbot-fronted/src/nodes/Messages.js
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 4 - ((3 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 4
normal! 0
tabnext
edit ~/code/whatsapp-chatbot-fronted/src/store.js
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 90 + 90) / 181)
exe 'vert 2resize ' . ((&columns * 90 + 90) / 181)
argglobal
balt ~/code/whatsapp-chatbot-fronted/src/App.css
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
10,22fold
27,30fold
33,36fold
39,53fold
55,60fold
62,81fold
83,104fold
110,114fold
116,126fold
133,148fold
150,174fold
176,189fold
191,204fold
206,213fold
let &fdl = &fdl
27
normal! zo
33
normal! zo
let s:l = 83 - ((82 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 83
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("~/code/whatsapp-chatbot-fronted/src/initialData.js", ":p")) | buffer ~/code/whatsapp-chatbot-fronted/src/initialData.js | else | edit ~/code/whatsapp-chatbot-fronted/src/initialData.js | endif
balt ~/code/whatsapp-chatbot-fronted/src/store.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 7 - ((0 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 7
normal! 018|
wincmd w
exe 'vert 1resize ' . ((&columns * 90 + 90) / 181)
exe 'vert 2resize ' . ((&columns * 90 + 90) / 181)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
