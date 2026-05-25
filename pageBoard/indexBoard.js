const boardGrid = document.getElementById("boardGrid");
const clearAllBtn = document.getElementById("clearAllBtn");
const selectedBlockName = document.getElementById("selectedBlockName");
const blockButtons = Array.from(document.querySelectorAll(".block-item"));

let selectedBlock = null;
let selectedBlockSrc = "";
const boardSize = 12;

function createBoard() {
  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", () => fillCell(cell));
      boardGrid.appendChild(cell);
    }
  }
}

function fillCell(cell) {
  if (!selectedBlock) {
    return;
  }

  if (cell.dataset.block === selectedBlock) {
    cell.removeAttribute("data-block");
    cell.style.backgroundImage = "";
    return;
  }

  cell.dataset.block = selectedBlock;
  cell.style.backgroundImage = `url('${selectedBlockSrc}')`;
}

function updateSelectedBlock(name, src, label, button) {
  selectedBlock = name;
  selectedBlockSrc = src;
  selectedBlockName.textContent = label || "никто";
  blockButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
}

blockButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const blockType = button.dataset.block;
    const src = button.dataset.src;
    const label = button.dataset.label;
    updateSelectedBlock(blockType, src, label, button);
  });
});

function clearBoard() {
  const allCells = boardGrid.querySelectorAll(".cell");
  allCells.forEach((cell) => {
    cell.removeAttribute("data-block");
    cell.style.backgroundImage = "";
  });
}

clearAllBtn.addEventListener("click", clearBoard);

createBoard();
let button = document.querySelector('.b');
    button.addEventListener('click', function() {
        window.location.href = '../pageMinecraft/indexMine.html';
    });
