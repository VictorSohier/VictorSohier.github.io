const canvas = document.getElementById("canvas");
const multiplierElement = document.getElementById("multiplier");
const modulusElement = document.getElementById("modulus");
const drawPointsElement = document.getElementById("drawPoints");
const strokeColorElement = document.getElementById("strokeColor");
const animateMultiplierButton = document.getElementById("animateMultiplier");
const animateModulusButton = document.getElementById("animateModulus");
const multplierMinimumElement = document.getElementById("multiplierMin");
const multplierMaximumElement = document.getElementById("multiplierMax");
const multplierStepElement = document.getElementById("multiplierStep");
const modulusMinimumElement = document.getElementById("modulusMin");
const modulusMaximumElement = document.getElementById("modulusMax");
const modulusStepElement = document.getElementById("modulusStep");
const gc = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let multiplier = parseFloat(multiplierElement.value);
let modulus = parseFloat(modulusElement.value);
let drawPoints = drawPointsElement.checked;
let strokeColor = strokeColorElement.value;

let animateColor = false;
let animateModulus = false;
let animateMultiplier = false;

let multiplierMin = parseFloat(multplierMinimumElement.value);
let multiplierMax = parseFloat(multplierMaximumElement.value);
let multiplierStep = parseFloat(multplierStepElement.value);

let modulusMin = parseFloat(modulusMinimumElement.value);
let modulusMax = parseFloat(modulusMaximumElement.value);
let modulusStep = parseFloat(modulusStepElement.value);
let modulusAccumulator = modulus;

multiplierElement.onchange = function()
{
	multiplier = parseFloat(multiplierElement.value);
};

modulusElement.onchange = function()
{
	modulus = parseFloat(modulusElement.value);
	modulusAccumulator = modulus;
};

drawPointsElement.onchange = function()
{
	drawPoints = drawPointsElement.checked;
};

strokeColorElement.onchange = function()
{
	strokeColor = strokeColorElement.value;
};

multplierMinimumElement.onchange = function()
{
	multiplierMin = parseFloat(multplierMinimumElement.value);;
};

multplierMaximumElement.onchange = function()
{
	multiplierMax = parseFloat(multplierMaximumElement.value);;
};

multplierStepElement.onchange = function()
{
	multiplierStep = parseFloat(multplierStepElement.value);;
};

modulusMinimumElement.onchange = function()
{
	multiplierMin = parseFloat(modulusMinimumElement.value);;
};

modulusMaximumElement.onchange = function()
{
	multiplierMax = parseFloat(modulusMaximumElement.value);;
};

modulusStepElement.onchange = function()
{
	modulusStep = parseFloat(modulusStepElement.value);;
};

animateMultiplierButton.onclick = function()
{
	animateMultiplier = !animateMultiplier;
};

animateModulusButton.onclick = function()
{
	animateModulus = !animateModulus;
};

animateColorButton.onclick = function()
{
	animateColor = !animateColor;
};

function DrawCircle(x, y, r, thickness, stroke, fill)
{
	gc.lineWidth = thickness * Math.min(canvasHeight, canvasWidth);
	gc.strokeStyle = stroke;
	gc.fillStyle = fill;
	gc.beginPath();
	gc.arc(x*canvasWidth, canvasHeight - y*canvasHeight, r*Math.min(canvasHeight, canvasWidth), 0, 2*Math.PI);
	if (fill)
		gc.fill();
	if (stroke)
		gc.stroke();
}

function DrawLine(x1, y1, x2, y2, thickness, stroke)
{
	gc.lineWidth = thickness * Math.min(canvasHeight, canvasWidth);
	gc.strokeStyle = stroke;
	gc.beginPath();
	gc.moveTo(x1*canvasWidth, canvasHeight - y1*canvasHeight);
	gc.lineTo(x2*canvasWidth, canvasHeight - y2*canvasHeight);
	gc.stroke();
}

function Erase()
{
	gc.fillStyle = "#FFFFFF";
	gc.fillRect(0, 0, canvasWidth, canvasHeight);
}

function DrawCardiod()
{
	Erase();
	if (animateMultiplier)
	{
		multiplier += multiplierStep/60;
		multiplierElement.value = multiplier;
		if (multiplier >= multiplierMax)
		{
			multiplierStep = -Math.abs(multiplierStep);
		}
		else if (multiplier <= multiplierMin)
		{
			multiplierStep = Math.abs(multiplierStep);
		}
	}
	if (animateModulus)
	{
		modulusAccumulator += modulusStep/60;
		if (modulusAccumulator >= modulusMax)
		{
			modulusStep = -Math.abs(modulusStep);
		}
		else if (modulusAccumulator <= modulusMin)
		{
			modulusStep = Math.abs(modulusStep);
		}
		if (Math.trunc(modulusAccumulator) != modulus)
		{
			modulus = Math.trunc(modulusAccumulator);
			modulusElement.value = modulus;
		}
	}
	for (let i = 0; i < modulus; i++)
	{
		let startAngle = 2 * Math.PI / modulus * i;
		let endAngle = 2 * Math.PI / modulus * ((i * multiplier) % modulus);
		DrawLine(
			(Math.sin(startAngle) * 0.4) + 0.5,
			(Math.cos(startAngle) * 0.4) + 0.5,
			(Math.sin(endAngle) * 0.4) + 0.5,
			(Math.cos(endAngle) * 0.4) + 0.5,
			0.0025/16,
			strokeColor);
	}
	DrawCircle(0.5, 0.5, 0.4, 0.01, "#000000");
	if (drawPoints)
	{
		for (let i = 0; i < modulus; i++)
		{
			let angle = 2 * Math.PI / modulus * i;
			DrawCircle((Math.sin(angle) * 0.4) + 0.5, (Math.cos(angle) * 0.4) + 0.5, 0.02, 0.01, "#000000", "#FFFFFF");
		}
	}
}
let raf;
setInterval(function() {
	raf = window.requestAnimationFrame(DrawCardiod)
}, 1000/60);