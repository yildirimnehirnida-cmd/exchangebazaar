const initialProducts = [
  {id:1,title:"Calculus — Ders Kitabı",category:"Kitaplar",type:"Satılık",price:24,emoji:"📚",visual:"#f0e7ff",description:"Temiz kullanılmış, not alınmamış.",meta:"Merkez kampüs · Demo ilan"},
  {id:2,title:"Kablosuz Kulaklık",category:"Teknoloji",type:"Kiralık",price:12,emoji:"🎧",visual:"#ffead7",description:"Ders çalışmak ve yolculuk için.",meta:"Teslim noktası örneği · Demo"},
  {id:3,title:"Masa Lambası",category:"Yaşam",type:"Satılık",price:18,emoji:"💡",visual:"#fff0b8",description:"Yurt odası için pratik ve hafif.",meta:"Merkez kampüs · Demo ilan"},
  {id:4,title:"Şehir Bisikleti",category:"Spor",type:"Kiralık",price:20,emoji:"🚲",visual:"#dff5cf",description:"Kısa kampüs yolculukları için.",meta:"Günlük kiralama örneği · Demo"},
  {id:5,title:"İngilizce Hazırlık Seti",category:"Kitaplar",type:"Satılık",price:15,emoji:"📖",visual:"#dcecff",description:"Hazırlık sınıfı için kaynak kitaplar.",meta:"Merkez kampüs · Demo ilan"},
  {id:6,title:"Mini Bluetooth Hoparlör",category:"Teknoloji",type:"Kiralık",price:9,emoji:"🔊",visual:"#ffe0ed",description:"Küçük boyutlu, taşınabilir.",meta:"Teslim noktası örneği · Demo"},
  {id:7,title:"Sukulent ve Saksı",category:"Yaşam",type:"Satılık",price:8,emoji:"🪴",visual:"#d7f5ed",description:"Masan için minik bir yeşil arkadaş.",meta:"Merkez kampüs · Demo ilan"},
  {id:8,title:"Yoga Matı",category:"Spor",type:"Kiralık",price:7,emoji:"🧘",visual:"#e9e0ff",description:"Başlangıç seviyesi için uygun.",meta:"Günlük kiralama örneği · Demo"}
];
let products = [...initialProducts];
let activeCategory = "Tümü";
let savedIds = new Set();
let authMode = "login";
let demoBalance = 100;

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const resultsLabel = document.getElementById("resultsLabel");
const toastEl = document.getElementById("toast");

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[char]));
}
function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("tr");
  const filtered = products.filter(product => {
    const categoryMatch = activeCategory === "Tümü" || product.category === activeCategory;
    const text = `${product.title} ${product.category} ${product.description} ${product.type}`.toLocaleLowerCase("tr");
    return categoryMatch && text.includes(query);
  });
  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-visual" style="--visual:${product.visual}">
        <span class="type-pill">${escapeHTML(product.type)}</span>
        <button class="save-button ${savedIds.has(product.id) ? "saved" : ""}" data-save="${product.id}" aria-label="Favorilere ekle">${savedIds.has(product.id) ? "♥" : "♡"}</button>
        <span class="product-emoji" aria-hidden="true">${product.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${escapeHTML(product.category)}</div>
        <h3>${escapeHTML(product.title)}</h3>
        <p class="product-desc">${escapeHTML(product.description || "Kampüs içinde paylaşım için demo ilan.")}</p>
        <div class="product-bottom">
          <div class="price">${Number(product.price)} <small>kredi${product.type === "Kiralık" ? " / gün" : ""}</small></div>
          <button class="product-action" data-action="${product.id}">${product.type === "Kiralık" ? "Kirala" : "Detayları gör"} ↗</button>
        </div>
        <div class="product-meta"><span class="meta-dot"></span>${escapeHTML(product.meta || "Demo ilan · Kimlik doğrulanmadı")}</div>
      </div>
    </article>`).join("");
  emptyState.classList.toggle("hidden", filtered.length !== 0);
  grid.classList.toggle("hidden", filtered.length === 0);
  resultsLabel.textContent = `${filtered.length} örnek ilan gösteriliyor`;
  document.getElementById("listingCount").textContent = products.length;
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toastEl.classList.remove("show"), 3000);
}
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
  if (document.querySelectorAll(".modal-backdrop:not(.hidden)").length === 0) document.body.style.overflow = "";
}
function openListing() {
  openModal("listingModal");
}
function setAuthMode(mode) {
  authMode = mode;
  document.querySelectorAll("[data-auth-tab]").forEach(button => button.classList.toggle("active", button.dataset.authTab === mode));
  document.getElementById("authTitle").textContent = mode === "login" ? "Tekrar merhaba!" : "Kampüse katıl!";
  document.getElementById("authSubmit").innerHTML = mode === "login" ? 'Giriş ekranını dene <span>→</span>' : 'Kayıt ekranını dene <span>→</span>';
  document.getElementById("authNotice").textContent = mode === "login"
    ? "Gerçek kayıt için sonraki aşamada Supabase Auth ve üniversite alan adı kontrolü eklenecek."
    : "Kayıt şu an etkin değil. Gerçek sürümde İstanbul Üniversitesi alan adı kontrolü ve e-posta doğrulaması uygulanacak.";
}
document.getElementById("categoryList").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll("[data-category]").forEach(item => item.classList.toggle("active", item === button));
  renderProducts();
});
searchInput.addEventListener("input", renderProducts);
document.getElementById("allListings").addEventListener("click", () => {
  activeCategory = "Tümü";
  searchInput.value = "";
  document.querySelectorAll("[data-category]").forEach(item => item.classList.toggle("active", item.dataset.category === "Tümü"));
  renderProducts();
});
document.getElementById("resetFilters").addEventListener("click", () => {
  activeCategory = "Tümü"; searchInput.value = "";
  document.querySelectorAll("[data-category]").forEach(item => item.classList.toggle("active", item.dataset.category === "Tümü"));
  renderProducts();
});
grid.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    const id = Number(saveButton.dataset.save);
    if (savedIds.has(id)) savedIds.delete(id); else savedIds.add(id);
    renderProducts();
    showToast(savedIds.has(id) ? "Demo ilanı favorilere eklendi." : "Demo ilanı favorilerden çıkarıldı.");
    return;
  }
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const product = products.find(item => item.id === Number(actionButton.dataset.action));
    if (product) showToast(`${product.title}: Bu demo sürümünde gerçek işlem yapılamaz.`);
  }
});
document.getElementById("openAuth").addEventListener("click", () => openModal("authModal"));
document.getElementById("heroList").addEventListener("click", openListing);
document.getElementById("communityList").addEventListener("click", openListing);
document.getElementById("walletJump").addEventListener("click", () => {
  document.getElementById("walletCard").scrollIntoView({behavior:"smooth",block:"center"});
  showToast("Bu, gerçek olmayan demo kredi bakiyendir.");
});
document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => closeModal(button.dataset.close)));
document.querySelectorAll(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("click", event => {
  if (event.target === backdrop) closeModal(backdrop.id);
}));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") document.querySelectorAll(".modal-backdrop:not(.hidden)").forEach(modal => closeModal(modal.id));
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault(); searchInput.focus();
  }
});
document.querySelectorAll("[data-auth-tab]").forEach(button => button.addEventListener("click", () => setAuthMode(button.dataset.authTab)));
document.getElementById("authForm").addEventListener("submit", event => {
  event.preventDefault();
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  if (!email || password.length < 8) return;
  document.getElementById("authNotice").textContent = "Demo tamamlandı: hiçbir hesap açılmadı, şifre saklanmadı ve e-posta doğrulanmadı. Gerçek kimlik doğrulaması henüz kurulmadı.";
  showToast("Bu yalnızca arayüz demosu; giriş yapılmadı.");
});
document.getElementById("listingForm").addEventListener("submit", event => {
  event.preventDefault();
  const title = document.getElementById("newTitle").value.trim();
  const category = document.getElementById("newCategory").value;
  const type = document.getElementById("newType").value;
  const price = Number(document.getElementById("newPrice").value);
  const description = document.getElementById("newDescription").value.trim();
  if (!title || !Number.isFinite(price) || price < 1) return;
  const emojiByCategory = {Kitaplar:"📚",Teknoloji:"🎧",Yaşam:"🪴",Spor:"⚽",Diğer:"✨"};
  const visualByCategory = {Kitaplar:"#f0e7ff",Teknoloji:"#ffead7",Yaşam:"#d7f5ed",Spor:"#dff5cf",Diğer:"#dcecff"};
  products.unshift({id:Date.now(),title,category,type,price,emoji:emojiByCategory[category],visual:visualByCategory[category],description:description || "Kullanıcı tarafından eklenen demo ilan.",meta:"Yerel demo ilan · Doğrulanmış kullanıcı değil"});
  activeCategory = "Tümü"; searchInput.value = "";
  document.querySelectorAll("[data-category]").forEach(item => item.classList.toggle("active", item.dataset.category === "Tümü"));
  renderProducts(); closeModal("listingModal"); event.target.reset();
  document.getElementById("market").scrollIntoView({behavior:"smooth"});
  showToast("Demo ilanı eklendi. Sayfa yenilenince kaybolur.");
});
renderProducts();
