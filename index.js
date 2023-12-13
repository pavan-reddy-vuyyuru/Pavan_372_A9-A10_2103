document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('main');
    var ctx = canvas.getContext('2d');
    var painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        ctx.lineWidth = document.getElementById('slider').value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = getColor();

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function getColor() {
        var colorButtons = document.querySelectorAll('.btn-action');
        for (var i = 0; i < colorButtons.length; i++) {
            if (colorButtons[i].classList.contains('active')) {
                return window.getComputedStyle(colorButtons[i], null).getPropertyValue('background-color');
            }
        }
        return '#000000';
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseout', endPosition);

    document.getElementById('new').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('erase').addEventListener('click', function() {
        ctx.strokeStyle = '#ffffff';
        clearButtonSelection();
        document.getElementById('erase').classList.add('active');
    });

    document.querySelectorAll('.btn-action').forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.id === 'erase') {
                ctx.globalCompositeOperation = 'destination-out';
            } else {
                ctx.strokeStyle = getColor();
                clearButtonSelection();
                button.classList.add('active');
            }
        });
    });

    var slider = document.getElementById('slider');
    var brushSize = document.getElementById('brushSize');
    brushSize.innerHTML = slider.value;

    slider.addEventListener('input', function() {
        brushSize.innerHTML = this.value;
    });

    function clearButtonSelection() {
        document.querySelectorAll('.btn-action').forEach(function(button) {
            button.classList.remove('active');
        });
    }
});