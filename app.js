(() => {
  "use strict";

  const BOOKS = window.WORD_BOOKS || [];
  const app = document.getElementById("app");
  const toastEl = document.getElementById("toast");
  const starNumEl = document.getElementById("starNum");
  const soundToggle = document.getElementById("soundToggle");

  const MODES = [
    { id: "flash", name: "学习卡", emoji: "🃏" },
    { id: "listen", name: "听音选词", emoji: "👂" },
    { id: "picture", name: "看图选词", emoji: "🖼️" },
    { id: "spell", name: "拼单词", emoji: "🔤" },
    { id: "memory", name: "记忆配对", emoji: "🧠" }
  ];

  const store = {
    get stars() { return Number(localStorage.getItem("wf_stars") || 0); },
    set stars(v) { localStorage.setItem("wf_stars", String(v)); },
    get sound() { return localStorage.getItem("wf_sound") !== "off"; },
    set sound(v) { localStorage.setItem("wf_sound", v ? "on" : "off"); },
    mastered(deckId) {
      try { return new Set(JSON.parse(localStorage.getItem("wf_m_" + deckId) || "[]")); }
      catch (e) { return new Set(); }
    },
    saveMastered(deckId, set) {
      localStorage.setItem("wf_m_" + deckId, JSON.stringify([...set]));
    }
  };

  /* ---------- utils ---------- */
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const sample = (arr, n) => shuffle(arr).slice(0, n);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const deckById = (id) => BOOKS.find((b) => b.id === id);

  let starTimer = null;
  const renderStars = () => { starNumEl.textContent = store.stars; };
  const addStars = (n) => {
    store.stars = store.stars + n;
    renderStars();
    starNumEl.parentElement.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.3)" }, { transform: "scale(1)" }],
      { duration: 360 }
    );
  };

  const toast = (msg, kind) => {
    toastEl.textContent = msg;
    toastEl.className = "toast show" + (kind ? " " + kind : "");
    clearTimeout(starTimer);
    starTimer = setTimeout(() => { toastEl.className = "toast"; }, 1500);
  };

  /* ---------- speech ---------- */
  let voice = null;
  const pickVoice = () => {
    if (!("speechSynthesis" in window)) return;
    const vs = window.speechSynthesis.getVoices();
    voice = vs.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|google/i.test(v.name))
      || vs.find((v) => /en[-_]US/i.test(v.lang))
      || vs.find((v) => /^en/i.test(v.lang)) || null;
  };
  if ("speechSynthesis" in window) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }
  const speak = (text, rate) => {
    if (!store.sound || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = rate || 0.9;
      if (voice) u.voice = voice;
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  };

  /* ---------- sound toggle ---------- */
  const syncSoundBtn = () => {
    const on = store.sound;
    soundToggle.setAttribute("aria-pressed", on ? "true" : "false");
    soundToggle.innerHTML = on ? '<span aria-hidden="true">🔊</span> 发音开' : '<span aria-hidden="true">🔈</span> 发音关';
  };
  soundToggle.addEventListener("click", () => {
    store.sound = !store.sound;
    syncSoundBtn();
    if (store.sound) speak("Hello");
  });

  /* ---------- router ---------- */
  const go = (hash) => { location.hash = hash; };
  const route = () => {
    window.speechSynthesis && window.speechSynthesis.cancel();
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (parts[0] === "deck" && deckById(parts[1])) {
      renderDeck(parts[1], parts[2] || "flash");
    } else {
      renderHome();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.addEventListener("hashchange", route);

  /* ---------- init ---------- */
  renderStars();
  syncSoundBtn();
  route();

  /* ---------- home ---------- */
  function renderHome() {
    const cards = BOOKS.map((b) => {
      const mastered = store.mastered(b.id).size;
      const total = b.words.length;
      const done = mastered >= total;
      return `
        <button class="deck-card" style="--c:${b.color}" data-deck="${b.id}">
          <span class="deck-emoji" aria-hidden="true">${b.emoji}</span>
          <span>
            <span class="deck-title">${esc(b.title)}</span>
            <span class="deck-en">${esc(b.en)} · ${total} 词</span>
          </span>
          <span class="deck-meta ${done ? "deck-done" : ""}">${done ? "✓ 已学完" : "已掌握 " + mastered + "/" + total}</span>
        </button>`;
    }).join("");

    const howto = [
      { e: "🃏", t: "学习卡", d: "看图听音记单词" },
      { e: "👂", t: "听音选词", d: "听发音选正确" },
      { e: "🖼️", t: "看图选词", d: "看图片认单词" },
      { e: "🔤", t: "拼单词", d: "排字母拼出来" },
      { e: "🧠", t: "记忆配对", d: "英文配中文" }
    ].map((x) => `
      <div class="howto-item">
        <div class="ht-emoji" aria-hidden="true">${x.e}</div>
        <strong>${x.t}</strong>
        <span>${x.d}</span>
      </div>`).join("");

    app.innerHTML = `
      <section class="hero">
        <div class="hero-inner">
          <div class="hero-mascots" aria-hidden="true">🐶 🍎 🌈 🚀</div>
          <h1>和小伙伴一起<br><span class="pop">开心学单词！</span></h1>
          <p>看图片、听发音、玩游戏，${BOOKS.length} 个主题单词书，${BOOKS.reduce((n, b) => n + b.words.length, 0)} 个常用单词，边玩边记，越学越想学。</p>
          <div class="btn-row">
            <button class="btn btn--accent btn--big" data-deck="${BOOKS[0] ? BOOKS[0].id : ""}">🚀 马上开始</button>
          </div>
        </div>
      </section>

      <div class="sec-head">
        <h2>选一本单词书</h2>
        <span>点一下就能进入</span>
      </div>
      <div class="deck-grid">${cards}</div>

      <div class="howto">
        <h2>五种玩法，怎么玩？</h2>
        <div class="howto-list">${howto}</div>
      </div>`;

    app.querySelectorAll("[data-deck]").forEach((el) => {
      el.addEventListener("click", () => el.dataset.deck && go("#/deck/" + el.dataset.deck + "/flash"));
    });
  }

  /* ---------- deck shell ---------- */
  function renderDeck(deckId, mode) {
    const deck = deckById(deckId);
    if (!MODES.some((m) => m.id === mode)) mode = "flash";
    app.style.setProperty("--accent", deck.color);
    app.style.setProperty("--accent-tint", deck.tint);

    const tabs = MODES.map((m) => `
      <button class="mode-tab ${m.id === mode ? "is-active" : ""}" data-mode="${m.id}">
        <span class="mt-emoji" aria-hidden="true">${m.emoji}</span>${m.name}
      </button>`).join("");

    app.innerHTML = `
      <div class="deckbar">
        <button class="back-btn" id="backHome">← 返回</button>
        <span class="deck-chip"><span aria-hidden="true">${deck.emoji}</span> ${esc(deck.title)} · ${esc(deck.en)}</span>
      </div>
      <div class="mode-tabs">${tabs}</div>
      <div class="play-area" id="playArea"></div>`;

    app.querySelector("#backHome").addEventListener("click", () => go("#/"));
    app.querySelectorAll("[data-mode]").forEach((el) => {
      el.addEventListener("click", () => go("#/deck/" + deckId + "/" + el.dataset.mode));
    });

    const area = app.querySelector("#playArea");
    if (mode === "flash") runFlash(deck, area);
    else if (mode === "listen") runQuiz(deck, area, "listen");
    else if (mode === "picture") runQuiz(deck, area, "picture");
    else if (mode === "spell") runSpell(deck, area);
    else if (mode === "memory") runMemory(deck, area);
  }

  function resultBlock(area, emoji, title, text, onAgain) {
    area.innerHTML = `
      <div class="result">
        <div class="r-emoji" aria-hidden="true">${emoji}</div>
        <h3>${esc(title)}</h3>
        <p>${esc(text)}</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn--accent" id="againBtn">再玩一次</button>
          <button class="btn btn--ghost" id="homeBtn">换一本</button>
        </div>
      </div>`;
    area.querySelector("#againBtn").addEventListener("click", onAgain);
    area.querySelector("#homeBtn").addEventListener("click", () => go("#/"));
  }

  /* ---------- mode: flashcards ---------- */
  function runFlash(deck, area) {
    let i = 0;
    const mastered = store.mastered(deck.id);

    const draw = () => {
      const w = deck.words[i];
      const isM = mastered.has(w.en);
      area.innerHTML = `
        <div class="progress">
          <div class="progress-bar"><i style="width:${((i + 1) / deck.words.length) * 100}%"></i></div>
          <span class="progress-num">${i + 1} / ${deck.words.length}</span>
        </div>
        <div class="flash">
          <div class="flash-card" id="flashCard">
            <div class="flash-face">
              <div class="pic" aria-hidden="true">${w.pic}</div>
              <div class="word">${esc(w.en)}</div>
              <div class="ipa">${esc(w.ipa)}</div>
              <div class="tip">👆 点一下卡片看中文</div>
            </div>
            <div class="flash-face flash-back">
              <div class="zh">${esc(w.zh)}</div>
              <div class="ex">${esc(w.ex)}</div>
              <div class="exZh">${esc(w.exZh)}</div>
            </div>
          </div>
        </div>
        <div class="flash-controls">
          <button class="icon-btn" id="prevBtn" aria-label="上一个">◀</button>
          <button class="icon-btn speak-btn" id="speakBtn" aria-label="朗读单词">🔊</button>
          <button class="btn ${isM ? "btn--sun" : "btn--accent"}" id="knowBtn">${isM ? "⭐ 已记住" : "✓ 记住了"}</button>
          <button class="icon-btn" id="nextBtn" aria-label="下一个">▶</button>
        </div>`;

      const card = area.querySelector("#flashCard");
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
        if (card.classList.contains("flipped")) speak(w.zh ? w.ex : w.en);
      });
      area.querySelector("#speakBtn").addEventListener("click", (e) => { e.stopPropagation(); speak(w.en); });
      area.querySelector("#prevBtn").addEventListener("click", () => { i = (i - 1 + deck.words.length) % deck.words.length; draw(); });
      area.querySelector("#nextBtn").addEventListener("click", () => { i = (i + 1) % deck.words.length; draw(); });
      area.querySelector("#knowBtn").addEventListener("click", () => {
        if (!mastered.has(w.en)) {
          mastered.add(w.en);
          store.saveMastered(deck.id, mastered);
          addStars(1);
          toast("太棒了，+1 ⭐", "good");
        }
        if (i < deck.words.length - 1) { i += 1; draw(); }
        else { flashDone(); }
      });
      speak(w.en);
    };

    const flashDone = () => {
      resultBlock(area, "🎉", "这本都看完啦！", "已掌握 " + mastered.size + " / " + deck.words.length + " 个单词，去玩个游戏巩固一下吧！", () => { i = 0; draw(); });
    };

    draw();
  }

  /* ---------- mode: listen / picture quiz ---------- */
  function runQuiz(deck, area, kind) {
    const total = Math.min(8, deck.words.length);
    let questions = sample(deck.words, total);
    let qi = 0, correct = 0, earned = 0, locked = false;

    const drawQ = () => {
      locked = false;
      const target = questions[qi];
      const distract = sample(deck.words.filter((w) => w.en !== target.en), 3);
      const opts = shuffle([target, ...distract]);

      const prompt = kind === "listen"
        ? `<button class="quiz-listen" id="playBtn"><span aria-hidden="true">🔊</span> 再听一次</button>
           <p class="q-sub">听一听，选出正确的那一个</p>`
        : `<div class="big-pic" aria-hidden="true">${target.pic}</div>
           <p class="q-sub">看图片，选出正确的英文单词</p>`;

      const optionsHtml = opts.map((o) => {
        const inner = kind === "listen"
          ? `<span class="opt-pic" aria-hidden="true">${o.pic}</span> ${esc(o.zh)}`
          : `${esc(o.en)}`;
        return `<button class="option" data-en="${esc(o.en)}">${inner}</button>`;
      }).join("");

      area.innerHTML = `
        <div class="progress">
          <div class="progress-bar"><i style="width:${(qi / total) * 100}%"></i></div>
          <span class="progress-num">${qi + 1} / ${total} · ⭐${earned}</span>
        </div>
        <div class="quiz-prompt">${prompt}</div>
        <div class="options">${optionsHtml}</div>`;

      if (kind === "listen") {
        area.querySelector("#playBtn").addEventListener("click", () => speak(target.en));
        speak(target.en);
      }

      area.querySelectorAll(".option").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (locked) return;
          locked = true;
          const good = btn.dataset.en === target.en;
          area.querySelectorAll(".option").forEach((b) => {
            b.disabled = true;
            if (b.dataset.en === target.en) b.classList.add("correct");
          });
          if (good) {
            btn.classList.add("correct");
            correct += 1; earned += 1; addStars(1);
            toast("答对啦！+1 ⭐", "good");
            speak(target.en);
          } else {
            btn.classList.add("wrong");
            toast("正确答案是 " + target.en, "bad");
          }
          setTimeout(() => {
            qi += 1;
            if (qi < total) drawQ(); else finish();
          }, good ? 850 : 1350);
        });
      });
    };

    const finish = () => {
      const emoji = correct === total ? "🏆" : correct >= total * 0.6 ? "🎉" : "💪";
      const title = correct === total ? "全对，太厉害了！" : correct >= total * 0.6 ? "做得很好！" : "继续加油！";
      resultBlock(area, emoji, title, "答对 " + correct + " / " + total + " 题，获得 " + earned + " 颗星星 ⭐", () => {
        questions = sample(deck.words, total); qi = 0; correct = 0; earned = 0; drawQ();
      });
    };

    drawQ();
  }

  /* ---------- mode: spelling ---------- */
  function runSpell(deck, area) {
    const pool = deck.words.filter((w) => /^[a-z]+$/i.test(w.en) && w.en.length <= 8);
    const words = pool.length >= 4 ? pool : deck.words.filter((w) => /^[a-z]+$/i.test(w.en));
    const total = Math.min(8, words.length);
    let questions = sample(words, total);
    let qi = 0, earned = 0;

    const drawQ = () => {
      const target = questions[qi];
      const letters = shuffle(target.en.split(""));
      const placed = [];

      area.innerHTML = `
        <div class="progress">
          <div class="progress-bar"><i style="width:${(qi / total) * 100}%"></i></div>
          <span class="progress-num">${qi + 1} / ${total} · ⭐${earned}</span>
        </div>
        <div class="spell-pic" aria-hidden="true">${target.pic}</div>
        <div class="spell-zh">${esc(target.zh)} · <button class="back-btn" id="hearBtn">🔊 听一听</button></div>
        <div class="spell-slots" id="slots"></div>
        <div class="letters" id="letters"></div>
        <div class="btn-row" style="justify-content:center;margin-top:16px">
          <button class="btn btn--ghost" id="clearBtn">⌫ 退一个</button>
        </div>`;

      const slotsEl = area.querySelector("#slots");
      const lettersEl = area.querySelector("#letters");
      const renderSlots = () => {
        slotsEl.innerHTML = target.en.split("").map((_, idx) =>
          `<div class="slot ${placed[idx] != null ? "filled" : ""}">${placed[idx] != null ? esc(placed[idx].ch) : ""}</div>`
        ).join("");
      };
      lettersEl.innerHTML = letters.map((ch, idx) => `<button class="letter" data-idx="${idx}">${esc(ch)}</button>`).join("");
      renderSlots();

      const check = () => {
        if (placed.length !== target.en.length) return;
        const guess = placed.map((p) => p.ch).join("");
        if (guess === target.en) {
          earned += 1; addStars(1); toast("拼对啦！+1 ⭐", "good"); speak(target.en);
          setTimeout(() => { qi += 1; if (qi < total) drawQ(); else finish(); }, 850);
        } else {
          toast("再试试看～", "bad");
          slotsEl.animate([{ transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }], { duration: 300 });
          setTimeout(() => {
            placed.length = 0;
            lettersEl.querySelectorAll(".letter").forEach((b) => { b.disabled = false; });
            renderSlots();
          }, 500);
        }
      };

      lettersEl.querySelectorAll(".letter").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.disabled || placed.length >= target.en.length) return;
          placed.push({ ch: btn.textContent, btn });
          btn.disabled = true;
          renderSlots();
          check();
        });
      });
      area.querySelector("#clearBtn").addEventListener("click", () => {
        const last = placed.pop();
        if (last) last.btn.disabled = false;
        renderSlots();
      });
      area.querySelector("#hearBtn").addEventListener("click", () => speak(target.en));
      speak(target.en);
    };

    const finish = () => {
      resultBlock(area, "🏆", "拼写小能手！", "这一轮获得 " + earned + " 颗星星 ⭐，继续挑战下一本吧！", () => {
        questions = sample(words, total); qi = 0; earned = 0; drawQ();
      });
    };

    drawQ();
  }

  /* ---------- mode: memory match ---------- */
  function runMemory(deck, area) {
    const pairs = Math.min(6, deck.words.length);
    let chosen = sample(deck.words, pairs);
    let cards = [];
    let first = null, lock = false, matched = 0, earned = 0;

    const build = () => {
      cards = shuffle(chosen.flatMap((w) => ([
        { key: w.en, type: "en", html: `<span aria-hidden="true" style="font-size:26px">${w.pic}</span><span class="m-face">${esc(w.en)}</span>`, speak: w.en },
        { key: w.en, type: "zh", html: `<span class="m-face" style="font-size:18px">${esc(w.zh)}</span>`, speak: w.en }
      ])));
      first = null; lock = false; matched = 0; earned = 0;
      draw();
    };

    const draw = () => {
      area.innerHTML = `
        <p class="q-sub" style="text-align:center;margin:0 0 14px;color:var(--muted);font-weight:600">翻开卡片，把<strong>英文</strong>和<strong>中文</strong>配成一对 🧩</p>
        <div class="memory-grid" id="grid">
          ${cards.map((c, idx) => `<button class="mcard down" data-idx="${idx}" aria-label="卡片">?</button>`).join("")}
        </div>`;
      const grid = area.querySelector("#grid");
      grid.querySelectorAll(".mcard").forEach((btn) => {
        btn.addEventListener("click", () => onFlip(Number(btn.dataset.idx), btn));
      });
    };

    const showUp = (btn, card) => { btn.classList.remove("down"); btn.classList.add("up"); btn.innerHTML = card.html; };
    const showDown = (btn) => { btn.classList.remove("up"); btn.classList.add("down"); btn.innerHTML = "?"; };

    const onFlip = (idx, btn) => {
      if (lock || btn.classList.contains("up") || btn.classList.contains("matched")) return;
      const card = cards[idx];
      showUp(btn, card);
      if (card.type === "en") speak(card.speak);
      if (!first) { first = { idx, btn, card }; return; }
      if (first.idx === idx) return;
      lock = true;
      if (first.card.key === card.key) {
        setTimeout(() => {
          first.btn.classList.add("matched"); btn.classList.add("matched");
          first.btn.classList.remove("up"); btn.classList.remove("up");
          matched += 1; earned += 1; addStars(1); toast("配对成功！+1 ⭐", "good");
          first = null; lock = false;
          if (matched === pairs) setTimeout(finish, 500);
        }, 420);
      } else {
        setTimeout(() => { showDown(first.btn); showDown(btn); first = null; lock = false; }, 950);
      }
    };

    const finish = () => {
      resultBlock(area, "🎊", "全部配对成功！", "你获得了 " + earned + " 颗星星 ⭐，记忆力真棒！", () => { chosen = sample(deck.words, pairs); build(); });
    };

    build();
  }
})();
