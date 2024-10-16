const OP_NOTE_ON = 0x90,
      OP_CONT_CTRL = 0xb0,
      MIDDLE_C = 48,
      CTRL_SUSTAIN = 0x40;

export function setupMIDI(dispatch, adjOctaves) {
  const min = -12*adjOctaves,
        max = 12*(adjOctaves+1);

  navigator.requestMIDIAccess().then(
    access => {
      access.inputs.forEach(input => {
        input.onmidimessage = ({ data: [ op, param1, param2 ] }) => {
          switch (op) {
            case OP_NOTE_ON:
              const note = param1 - MIDDLE_C;
              if (note >= min && note < max) dispatch('toggle', note);
              break;
            case OP_CONT_CTRL:
              if (!param2 && param1 == CTRL_SUSTAIN) dispatch('clear');
          }
        };
      });
    }
  );
}
