document.getElementById("flower1").addEventListener("click", function() {
    document.getElementById("love-letter").classList.toggle("hidden");
});
// Add event listeners for more flowers if needed
document.addEventListener('DOMContentLoaded', function() {
    var audio = document.querySelector('audio');

    var flowers = document.querySelectorAll('.flower');
    flowers.forEach(function(flower, index) {
        flower.addEventListener('click', function() {
            audio.play();
        });
    });
});