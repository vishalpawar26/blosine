const verticalResizers = document.querySelectorAll(
  ".vertical-resizer"
) as NodeListOf<HTMLElement>;
const horizontalResizer = document.querySelector(
  ".horizontal-resizer"
) as HTMLElement;

let isResizing = false;
let lastMousePosition = 0;
let currentResizer: HTMLElement | null = null;

// Function to handle vertical resizing
function handleVerticalMouseMove(event: MouseEvent): void {
  if (!currentResizer) return;

  const parent = currentResizer.parentElement as HTMLElement;
  const prevPanel = currentResizer.previousElementSibling as HTMLElement;
  const nextPanel = currentResizer.nextElementSibling as HTMLElement;

  const delta = event.clientX - lastMousePosition;
  lastMousePosition = event.clientX;

  const newPrevWidth = Math.max(
    ((prevPanel.offsetWidth + delta) / parent.offsetWidth) * 100,
    10
  );
  const newNextWidth = Math.max(
    ((nextPanel.offsetWidth - delta) / parent.offsetWidth) * 100,
    10
  );

  prevPanel.style.width = `${newPrevWidth}%`;
  nextPanel.style.width = `${newNextWidth}%`;
}

// Function to handle horizontal resizing
function handleHorizontalMouseMove(event: MouseEvent): void {
  if (!currentResizer) return;

  const parent = currentResizer.parentElement as HTMLElement;
  const prevPanel = currentResizer.previousElementSibling as HTMLElement;
  const nextPanel = currentResizer.nextElementSibling as HTMLElement;

  const delta = event.clientY - lastMousePosition;
  lastMousePosition = event.clientY;

  const newPrevHeight = Math.max(
    ((prevPanel.offsetHeight + delta) / parent.offsetHeight) * 100,
    10
  );
  const newNextHeight = Math.max(
    ((nextPanel.offsetHeight - delta) / parent.offsetHeight) * 100,
    10
  );

  prevPanel.style.height = `${newPrevHeight}%`;
  nextPanel.style.height = `${newNextHeight}%`;
}

// General mouse move handler
function handleMouseMove(event: MouseEvent): void {
  if (!isResizing) return;

  if (currentResizer && currentResizer.classList.contains("vertical-resizer")) {
    handleVerticalMouseMove(event);
  } else if (
    currentResizer &&
    currentResizer.classList.contains("horizontal-resizer")
  ) {
    handleHorizontalMouseMove(event);
  }
}

// Mouseup handler to stop resizing
function handleMouseUp(): void {
  isResizing = false;
  currentResizer = null;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

// Attach mousedown event for vertical resizers
verticalResizers.forEach((resizer) => {
  resizer.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isResizing = true;
    lastMousePosition = event.clientX;
    currentResizer = resizer;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
});

// Attach mousedown event for the horizontal resizer
horizontalResizer.addEventListener("mousedown", (event) => {
  event.preventDefault();
  isResizing = true;
  lastMousePosition = event.clientY;
  currentResizer = horizontalResizer;

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});
