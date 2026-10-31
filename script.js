async function startConversion() {
    const fileInput = document.getElementById('audioFile');
    const voiceModel = document.getElementById('voiceModel').value;
    const statusArea = document.getElementById('statusArea');
    const statusText = document.getElementById('statusText');

    if (fileInput.files.length === 0) {
        alert("Iltimos, avval qo'shiq faylini tanlang!");
        return;
    }

    statusArea.classList.remove('hidden');
    statusText.innerText = "Fayl yuklanmoqda va sun'iy intellekt orqali qayta ishlanmoqda... Iltimos kuting (1-2 daqiqa vaqt olishi mumkin).";

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("audio", file);
    formData.append("model", voiceModel);

    try {
        // Bu yerga o'zingizning Hugging Face yoki boshqa backend API manzilingizni yozasiz
        const response = await fetch("https://your-backend-api.hf.space/run/predict", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data && data.audio_url) {
            statusText.innerHTML = `
                <p class="text-green-400 font-semibold mb-2">Tayyor!</p>
                <audio controls src="${data.audio_url}" class="w-full mt-2"></audio>
                <a href="${data.audio_url}" download class="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-500 transition">Natijani yuklab olish</a>
            `;
        } else {
            statusText.innerText = "Qayta ishlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.";
        }
    } catch (error) {
        console.error(error);
        statusText.innerText = "AI serveri bilan bog'lanishda xatolik yuz berdi.";
    }
}
