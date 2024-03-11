/**
 * Performs a base to base transformation for user inputted number.
 */
function convertBase() {
    const baseFrom = document.getElementById("base-from").value;
    const baseTo = document.getElementById("base-to").value;
    const input = document.getElementById("number-input").value;
    const result = parseInt(input, baseFrom).toString(baseTo);
    document.getElementById("result").value = result;
}

/**
 * Copies result to clipboard.
 */
function copyResult() {
    const result = document.getElementById("result").value;

    navigator.clipboard.writeText(result)
    .then(() => {
        console.log("Text copied to clipboard:", result);
        alert("Text copied to clipboard: " + result);
    })
    .catch(err => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text: " + err);
    });
}