/**
# COMPONENT **audio**
This component plays audio. Audio is played in one of two ways, by triggering specific messages defined in the audio component definition or using an audio map which plays sounds when the entity enters specified states (like render-animation).

## Dependencies:
- [createjs.SoundJS] [link1] - This component requires the SoundJS library to be included for audio functionality.
- [[Handler-Render]] (on entity's parent) - This component listens for a render "tick" message in order to stop audio clips that have a play length set.

## Messages

### Listens for:
- **handle-render** - On each `handle-render` message, this component checks its list of playing audio clips and stops any clips whose play length has been reached.
  > @param message.deltaT (number) - uses the value of deltaT (time since last `handle-render`) to track progess of the audio clip and stop clip if play length has been reached.
- **audio-mute-toggle** - On receiving this message, the audio will mute if unmuted, and unmute if muted.
  > @param message (string) - If a message is included, a string is expected that specifies an audio id, and that particular sound instance is toggled. Otherwise all audio is toggled from mute to unmute or vice versa.
- **audio-mute** - On receiving this message all audio will mute, or a particular sound instance will mute if an id is specified.
  > @param message (string) - If a message is included, a string is expected that specifies an audio id, and that particular sound instance is muted.
- **audio-unmute** - On receiving this message all audio will unmute, or a particular sound instance will unmute if an id is specified.
  > @param message (string) - If a message is included, a string is expected that specifies an audio id, and that particular sound instance is unmuted.
- **audio-stop** - On receiving this message all audio will stop playing.
- **logical-state** - This component listens for logical state changes and tests the current state of the entity against the audio map. If a match is found, the matching audio clip is played.
  > @param message (object) - Required. Lists various states of the entity as boolean values. For example: {jumping: false, walking: true}. This component retains its own list of states and updates them as `logical-state` messages are received, allowing multiple logical components to broadcast state messages.
- **[Messages specified in definition]** - Listens for additional messages and on receiving them, begins playing corresponding audio clips. Audio play message can optionally include several parameters, many of which correspond with [SoundJS play parameters] [link2].
  > @param message.interrupt (string) - Optional. Can be "any", "early", "late", or "none". Determines how to handle the audio when it's already playing but a new play request is received. Default is "any".
  > @param message.delay (integer) - Optional. Time in milliseconds to wait before playing audio once the message is received. Default is 0.
  > @param message.offset (integer) - Optional. Time in milliseconds determining where in the audio clip to begin playback. Default is 0.
  > @param message.length (integer) - Optional. Time in milliseconds to play audio before stopping it. If 0 or not specified, play continues to the end of the audio clip.
  > @param message.loop (integer) - Optional. Determines how many more times to play the audio clip once it finishes. Set to -1 for an infinite loop. Default is 0.
  > @param message.volume (float) - Optional. Used to specify how loud to play audio on a range from 0 (mute) to 1 (full volume). Default is 1.
  > @param message.pan (float) - Optional. Used to specify the pan of audio on a range of -1 (left) to 1 (right). Default is 0.
  > @param message.next (string) - Optional. Used to specify the next audio clip to play once this one is complete.

## JSON Definition:
    {
      "type": "audio",
      
      "audioMap":{
      // Required. Use the audioMap property object to map messages triggered with audio clips to play. At least one audio mapping should be included for audio to play.
      
        "message-triggered": "audio-id",
        // This simple form is useful to listen for "message-triggered" and play "audio-id" using default audio properties.
        
        "another-message": {
        // To specify audio properties, instead of mapping the message to an audio id string, map it to an object with one or more of the properties shown below. Many of these properties directly correspond to [SoundJS play parameters] (http://www.createjs.com/Docs/SoundJS/SoundJS.html#method_play).
        
          "sound": "another-audio-id",
          // Required. This is the audio clip to play when "another-message" is triggered.
          
          "interrupt": "none",
          // Optional. Can be "any", "early", "late", or "none". Determines how to handle the audio when it's already playing but a new play request is received. Default is "any".
          
          "delay": 500,
          // Optional. Time in milliseconds to wait before playing audio once the message is received. Default is 0.
          
          "offset": 1500,
          // Optional. Time in milliseconds determining where in the audio clip to begin playback. Default is 0.
          
          "length": 2500,
          // Optional. Time in milliseconds to play audio before stopping it. If 0 or not specified, play continues to the end of the audio clip.

          "loop": 4,
          // Optional. Determines how many more times to play the audio clip once it finishes. Set to -1 for an infinite loop. Default is 0.
          
          "volume": 0.75,
          // Optional. Used to specify how loud to play audio on a range from 0 (mute) to 1 (full volume). Default is 1.
          
          "pan": -0.25,
          // Optional. Used to specify the pan of audio on a range of -1 (left) to 1 (right). Default is 0.

          "next": ["audio-id"]
          // Optional. Used to specify a list of audio clips to play once this one is finished.
        }
      }
    }

[link1]: http://www.createjs.com/Docs/SoundJS/module_SoundJS.html
[link2]: http://www.createjs.com/Docs/SoundJS/SoundJS.html#method_play
*/
platformer.components['audio'] = (function(){
	var defaultSettings = {
		interrupt: createjs.Sound.INTERRUPT_ANY, //INTERRUPT_ANY, INTERRUPT_EARLY, INTERRUPT_LATE, or INTERRUPT_NONE
		delay:     0,
		offset:    0,
		loop:      0,
		volume:    1,
		pan:       0,
		length:    0,
		next:      false
	},
	stop = {
		stop: true,
		playthrough: true
	},
	playSound = function(soundDefinition){
		var sound = '',
		attributes = undefined,
		instance = null;
		if(typeof soundDefinition === 'string'){
			sound      = soundDefinition;
			attributes = {};
		} else {
			sound      = soundDefinition.sound;
			attributes = soundDefinition;
		}
		if(platformer.settings.assets[sound].data){
			for(var item in platformer.settings.assets[sound].data){
				attributes[item] = attributes[item] || platformer.settings.assets[sound].data[item];
			}
		}
		if(platformer.settings.assets[sound].assetId){
			sound = platformer.settings.assets[sound].assetId;
		}
		return function(value){
			var self = this,
			audio = undefined,
			next = false,
			length    = 0;
			
			value = value || attributes;
			if(value && value.stop){
				if(instance) {
					if(value.playthrough){
						instance.remainingLoops = 0;
					} else {
						instance.stop();
						for (var i in self.activeAudioClips){
							if (self.activeAudioClips[i] === instance){
								self.activeAudioClips.splice(i,1);
								break;
							}
						}
					}
				}
			} else {
				if(value){
					var interrupt = value.interrupt || attributes.interrupt || defaultSettings.interrupt,
					delay         = value.delay     || attributes.delay  || defaultSettings.delay,
					offset        = value.offset    || attributes.offset || defaultSettings.offset,
					loop          = value.loop      || attributes.loop   || defaultSettings.loop,
					volume        = (typeof value.volume !== 'undefined')? value.volume: ((typeof attributes.volume !== 'undefined')? attributes.volume: defaultSettings.volume),
					pan           = value.pan       || attributes.pan    || defaultSettings.pan,
					length        = value.length    || attributes.length || defaultSettings.length;
					
					next          = value.next      || attributes.next   || defaultSettings.next;
					
					audio = instance = createjs.Sound.play(sound, interrupt, delay, offset, loop, volume, pan);
					
				} else {
					audio = instance = createjs.Sound.play(sound, defaultSettings.interrupt, defaultSettings.delay, defaultSettings.offset, defaultSettings.loop, defaultSettings.volume, defaultSettings.pan);
				}

				if(next){
					audio.addEventListener('complete', function(){
						if((typeof next === 'string') || !next.length){
							self.owner.trigger(next);
						} else {
							var arr = next.slice();
							arr.splice(0,1);
							if(arr.length > 0){
								(playSound(next[0])).call(self, {'next': arr});
//								self.owner.trigger(next[0], {'next': arr});
							} else {
								(playSound(next[0])).call(self);
//								self.owner.trigger(next[0]);
							}
						}

						for (var i in self.activeAudioClips){
							if (self.activeAudioClips[i] === audio){
								self.activeAudioClips.splice(i,1);
								break;
							}
						}
					});
				} else {
					audio.addEventListener('complete', function(){
						for (var i in self.activeAudioClips){
							if (self.activeAudioClips[i] === audio){
								self.activeAudioClips.splice(i,1);
								break;
							}
						}
					});
				}

				if(audio.playState === 'playFailed'){
					if(this.owner.debug){
						console.warn('Unable to play "' + sound + '".', audio);
					}
				} else {
					if(length){ // Length is specified so we need to turn off the sound at some point.
						this.timedAudioClips.push({length: length, progress: 0, audio: audio, next: next});
					}
					this.activeAudioClips.push(audio);
				}
			}
		};
	},
	createTest = function(testStates, audio){
		var states = testStates.replace(/ /g, '').split(',');
		if(testStates === 'default'){
			return function(state){
				return testStates;
			};
		} else {
			return function(state){
				for(var i = 0; i < states.length; i++){
					if(!state[states[i]]){
						return false;
					}
				}
				return testStates;
			};
		}
	},
	component = function(owner, definition){
		this.owner = owner;
		this.timedAudioClips = [];
		this.activeAudioClips = [];		

		// Messages that this component listens for
		this.listeners = [];
		this.addListeners(['handle-render', 'audio-mute-toggle', 'audio-mute', 'audio-unmute', 'audio-stop', 'logical-state']);

		this.state = {};
		this.stateChange = false;
		this.currentState = false;

		this.forcePlaythrough = this.owner.forcePlaythrough || definition.forcePlaythrough;
		if(typeof this.forcePlaythrough !== 'boolean') {
			this.forcePlaythrough = true;
		}
		
		if(definition.audioMap){
			this.checkStates = [];
			for (var key in definition.audioMap){
				this.addListener(key);
				this[key] = playSound(definition.audioMap[key]);
				this.checkStates.push(createTest(key, definition.audioMap[key]));
			}
		}
	};
	var proto = component.prototype;
	
	proto['handle-render'] = function(resp){
		if (this.destroyMe && this.timedAudioClips.length == 0)
		{
			this.timedAudioClips = undefined;
			this.removeListeners(this.listeners);
		} else {
			var i     = 0,
			audioClip = undefined;
			newArray  = undefined;
			if(this.timedAudioClips.length){
				newArray = this.timedAudioClips;
				this.timedAudioClips = [];
				for (i in newArray){
					audioClip = newArray[i];
					audioClip.progress += resp.deltaT;
					if(audioClip.progress >= audioClip.length){
						audioClip.audio.stop();
						if(audioClip.next){
							if((typeof audioClip.next === 'string') || !audioClip.next.length){
								this.owner.trigger(audioClip.next);
							} else {
								var arr = audioClip.next.slice();
								arr.splice(0,1);
								if(arr.length > 0){
									(playSound(audioClip.next[0])).call(this, {'next': arr});
//									this.owner.trigger(audioClip.next[0], {'next': arr});
								} else {
									(playSound(audioClip.next[0])).call(this);
//									this.owner.trigger(audioClip.next[0]);
								}
							}
						}
					} else {
						this.timedAudioClips.push(audioClip);
					}
				}
//				this.timedAudioClips = newArray;
			}

			i = 0;
			if(this.stateChange){
				if(this.checkStates){
					if(this.currentState){
						stop.playthrough = this.forcePlaythrough;
						this[this.currentState](stop);
					}
					this.currentState = false;
					for(; i < this.checkStates.length; i++){
						audioClip = this.checkStates[i](this.state);
						if(audioClip){
							this.currentState = audioClip;
							this[this.currentState]();
							break;
						}
					}
				}
				this.stateChange = false;
			}
			
//			if(this.currentState){
//				this[this.currentState]();
//			}
		}
	};

	proto['logical-state'] = function(state){
		for(var i in state){
			if(this.state[i] !== state[i]){
				this.stateChange = true;
				this.state[i] = state[i];
			}
		}
	};
	
	proto['audio-mute-toggle'] = function(){
		createjs.Sound.setMute(!createjs.Sound.getMute());
	};
	
	proto['audio-stop'] = function(){
		for (var i in this.activeAudioClips){
			this.activeAudioClips[i].stop();
		}
		this.activeAudioClips.length = 0;
		this.timedAudioClips.length = 0;
	};

	proto['audio-mute'] = function(){
		createjs.Sound.setMute(true);
	};
	
	proto['audio-unmute'] = function(){
		createjs.Sound.setMute(false);
	};
	
	// This function should never be called by the component itself. Call this.owner.removeComponent(this) instead.
	proto.destroy = function(){
		//Handling things in 'render'
		this.destroyMe = true;
	};
	
	/*********************************************************************************************************
	 * The stuff below here will stay the same for all components. It's BORING!
	 *********************************************************************************************************/

	proto.addListeners = function(messageIds){
		for(var message in messageIds) this.addListener(messageIds[message]);
	};

	proto.removeListeners = function(listeners){
		for(var messageId in listeners) this.removeListener(messageId, listeners[messageId]);
	};
	
	proto.addListener = function(messageId, callback){
		var self = this,
		func = callback || function(value, debug){
			self[messageId](value, debug);
		};
		this.owner.bind(messageId, func);
		this.listeners[messageId] = func;
	};

	proto.removeListener = function(boundMessageId, callback){
		this.owner.unbind(boundMessageId, callback);
	};
	
	return component;
})();
