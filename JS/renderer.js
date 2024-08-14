const information = document.getElementById("info")

information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('incrementButton');

let clickCount = 0

function increment() {
    clickCount++

    const text = counterElement.textContent
    const updatedText = text.replace(/\d+$/, clickCount)
    counterElement.textContent = updatedText
}

incrementButton.addEventListener("click", increment)

