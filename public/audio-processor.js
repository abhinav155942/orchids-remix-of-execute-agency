class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = new Float32Array(0);
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0];
      // Send the raw float32 data to the main thread
      this.port.postMessage(channelData);
    }
    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor);
