export function setupMidi(dispatch, adjOctaves) {
  const min = -12*adjOctaves,
        max = 11+12*adjOctaves;

  navigator.requestMIDIAccess().then(
    access => {
      access.inputs.forEach(input => {
        input.onmidimessage = ({ data: [ op, data1, data2 ] }) => {
          switch (op) {
            case 0x90:
              const note = data1 - 48;
              if (note >= min && note <= max) dispatch('toggle', note);
              break;
            case 0xb0:
              if (!data2 && data1 == 64) dispatch('clear');
          }
        };
      });
    }
  );
}
