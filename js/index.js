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

const drawArrowsElement = document.getElementById("drawArrows");
const loopColorsElement = document.getElementById("loopColors");
const shadeByLengthElement = document.getElementById("lengthShading");

const gc = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const colors = [
	"#FF0000",
	"#00FF00",
	"#0000FF",
	"#00FFFF",
	"#FFFF00",
	"#FF00FF",
	"#000000"
];

let multiplier = parseFloat(multiplierElement.value);
let modulus = parseFloat(modulusElement.value);
let drawPoints = drawPointsElement.checked;
let drawArrows = drawArrowsElement.checked;
let loopColors = loopColorsElement.checked;
let shadeByLength = shadeByLengthElement.checked;
let strokeColor = strokeColorElement.value;

let animateModulus = false;
let animateMultiplier = false;

let multiplierMin = parseFloat(multplierMinimumElement.value);
let multiplierMax = parseFloat(multplierMaximumElement.value);
let multiplierStep = parseFloat(multplierStepElement.value);
let multiplierAccumulator = multiplier;

let modulusMin = parseFloat(modulusMinimumElement.value);
let modulusMax = parseFloat(modulusMaximumElement.value);
let modulusStep = parseFloat(modulusStepElement.value);
let modulusAccumulator = modulus;

multiplierElement.onchange = function()
{
	multiplier = parseFloat(multiplierElement.value);
	multiplierAccumulator = multiplier;
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

drawArrowsElement.onchange = function()
{
	drawArrows = drawArrowsElement.checked;
};

loopColorsElement.onchange = function()
{
	loopColors = loopColorsElement.checked;
	if (loopColors)
	{
		strokeColorElement.parentElement.classList.add("hidden");
	}
	else
	{
		strokeColorElement.parentElement.classList.remove("hidden");
	}
};

shadeByLengthElement.onchange = function()
{
	shadeByLength = shadeByLengthElement.checked;
};

function DrawCircle(x, y, r, thickness, stroke, fill)
{
	gc.lineWidth = thickness * Math.min(canvasHeight, canvasWidth);
	gc.strokeStyle = stroke;
	gc.fillStyle = fill;
	gc.beginPath();
	gc.arc(x*canvasWidth, canvasHeight - y*canvasHeight, r*Math.min(canvasHeight, canvasWidth), 0, 2*Math.PI);
	gc.closePath();
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

function DrawTriangle(x1, y1, x2, y2, x3, y3, thickness, stroke, fill)
{
	thickness = Math.round(thickness * Math.min(canvasHeight, canvasWidth));
	gc.lineWidth = thickness;
	gc.strokeStyle = stroke;
	gc.fillStyle = fill;
	gc.beginPath();
	gc.moveTo(x1*canvasWidth, canvasHeight - y1*canvasHeight);
	gc.lineTo(x2*canvasWidth, canvasHeight - y2*canvasHeight);
	gc.lineTo(x3*canvasWidth, canvasHeight - y3*canvasHeight);
	gc.closePath();
	if (fill)
		gc.fill();
	if (stroke)
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
		multiplierAccumulator += multiplierStep/60;
		if (multiplier >= multiplierMax)
		{
			multiplierStep = -Math.abs(multiplierStep);
		}
		else if (multiplier <= multiplierMin)
		{
			multiplierStep = Math.abs(multiplierStep);
		}
		if (Math.trunc(multiplierAccumulator) != multiplier)
		{
			multiplier = Math.trunc(multiplierAccumulator);
		}
		multiplierElement.value = multiplier;
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
	let numbers = [];
	let c = 0;
	let loopCount = 0;
	for (let i = 0; i < modulus; i++)
	{
		let tmp = i;
		while (!numbers.includes(tmp))
		{
			numbers.push(tmp);
			let startAngle = 2 * Math.PI / modulus * tmp;
			let endAngle = 2 * Math.PI / modulus * ((tmp * multiplier) % modulus);
			let color = loopColors ? colors[c] : strokeColor;
			let magnitude = (((
				((Math.sin(startAngle))
				-(Math.sin(endAngle))) ** 2
				+
				((Math.cos(startAngle))
				-(Math.cos(endAngle))) ** 2
			) ** 0.5) / 2);
			if (shadeByLength)
			{
				if (Math.round(magnitude * 255) < 16)
					color = color + "0";
				color = color + Math.round(magnitude * 255).toString(16);
			}
			DrawLine(
				(Math.sin(startAngle) * 0.4) + 0.5,
				(Math.cos(startAngle) * 0.4) + 0.5,
				(Math.sin(endAngle) * 0.4) + 0.5,
				(Math.cos(endAngle) * 0.4) + 0.5,
				0.00125,
				color);
			if (drawArrows)
			{
				let vector= [
					Math.abs(Math.sin(startAngle)-Math.sin(endAngle))/magnitude,
					Math.abs(Math.cos(startAngle)-Math.cos(endAngle))/magnitude
				];
				for (let j = 0; j < vector.length; j++)
				{
					vector[j] = vector[j] * 0.01;
				}
				let pt1 = [
					((Math.sin(endAngle) * 0.4) + 0.5 - (Math.sign(Math.sin(endAngle)-Math.sin(startAngle)))*(vector[0] + 0.5*vector[1])),
					(Math.cos(endAngle) * 0.4) + 0.5 - (Math.sign(Math.cos(endAngle)-Math.cos(startAngle)))*(vector[1] - 0.5*vector[0])
				];
				let pt2 = [
					(Math.sin(endAngle) * 0.4) + 0.5 - (Math.sign(Math.sin(endAngle)-Math.sin(startAngle)))*(vector[0] - 0.5*vector[1]),
					(Math.cos(endAngle) * 0.4) + 0.5 - (Math.sign(Math.cos(endAngle)-Math.cos(startAngle)))*(vector[1] + 0.5*vector[0])
				];
				if (!(pt1.includes(NaN) || pt2.includes(NaN)))
				{
					DrawTriangle(
						(Math.sin(endAngle) * 0.4) + 0.5,
						(Math.cos(endAngle) * 0.4) + 0.5,
						pt1[0],
						pt1[1],
						pt2[0],
						pt2[1],
						0.002,
						null,
						"#000000"
					);
				}
			}
			tmp = (tmp * multiplier) % modulus;
			if (numbers.includes(tmp))
			{
				c = (c + 1) % colors.length;
				loopCount++;
			}
		}
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
	document.getElementsByClassName("loopTarget")[0].innerHTML = loopCount - 1;
}

let raf;
let animation = setInterval(function() {
	raf = window.requestAnimationFrame(DrawCardiod)
}, 1000/60);