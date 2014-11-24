
// ------------------------------------------  live input  ---------------------------------------------------  >
(
SynthDef(\Live, {
	var mic = SoundIn.ar(0);
	Out.ar(0,mic);
}).add;

b = Synth(\Live);
b.free;

//{FreeVerb.ar(SoundIn.ar(0).distort)}.play

// ------------------------------------------  record session  ---------------------------------------------------  >
(
  s.recSampleFormat = 'int16';
  s.recHeaderFormat = 'wav'
)

s.makeWindow;
s.record;
s.stopRecording;

)
