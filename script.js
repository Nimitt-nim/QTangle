// Initial state of qubits as |0⟩ in vector form
let qubits = [
    [[1], [0]],  // Qubit 0: |0⟩
    [[1], [0]]   // Qubit 1: |0⟩
];

// Define basic gate matrices
const gates = {
    H: [[1 / Math.sqrt(2), 1 / Math.sqrt(2)], [1 / Math.sqrt(2), -1 / Math.sqrt(2)]],
    X: [[0, 1], [1, 0]],
    CNOT: null  // We’ll handle CNOT separately as it involves two qubits
};

// Matrix-vector multiplication for applying gates to states
function applyGate(gate, qubit) {
    let state = qubits[qubit];
    let newState = [
        [gate[0][0] * state[0][0] + gate[0][1] * state[1][0]],
        [gate[1][0] * state[0][0] + gate[1][1] * state[1][0]]
    ];
    qubits[qubit] = newState;  // Update the qubit state
}

// Helper function to convert the quantum state vector to string for display
function getStateString(state) {
    let amplitude0 = state[0][0].toFixed(2);
    let amplitude1 = state[1][0].toFixed(2);
    return `|0⟩: ${amplitude0}, |1⟩: ${amplitude1}`;
}

// Add gate to the circuit and compute the new state
function addGate(type, qubit) {
    const gateContainer = document.getElementById(`qubit-${qubit}-gates`);

    // Create a new gate element
    const gate = document.createElement("div");
    gate.classList.add("gate");
    gate.textContent = type;
    gateContainer.appendChild(gate);

    // Apply the gate to the qubit state
    if (type === 'CNOT') {
        applyCNOT(0, 1);  // Hardcoded for Qubit 0 as control, Qubit 1 as target
    } else {
        applyGate(gates[type], qubit);
    }

    // Update the qubit's state display
    updateQubitState(qubit);
}

// Apply CNOT gate between two qubits
function applyCNOT(control, target) {
    if (qubits[control][1][0] === 1) {
        // Flip target qubit if control qubit is in |1⟩ state
        applyGate(gates.X, target);
    }
}

// Update the display for a qubit's state
function updateQubitState(qubit) {
    const label = document.querySelector(`#qubit-${qubit} .label`);
    label.textContent = `Qubit ${qubit} ${getStateString(qubits[qubit])}`;
}

// Reset the circuit and qubit states
function resetCircuit() {
    document.getElementById("qubit-0-gates").innerHTML = "";
    document.getElementById("qubit-1-gates").innerHTML = "";

    // Reset qubits to |0⟩ state
    qubits = [
        [[1], [0]],  // Qubit 0: |0⟩
        [[1], [0]]   // Qubit 1: |0⟩
    ];

    // Update display
    document.querySelector("#qubit-0 .label").textContent = "Qubit 0 |0⟩: 1, |1⟩: 0";
    document.querySelector("#qubit-1 .label").textContent = "Qubit 1 |0⟩: 1, |1⟩: 0";
}
