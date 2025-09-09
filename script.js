    
        let currentScreen = 'splash';
        let intents = [
            {
                id: '1',
                type: 'Send',
                offering: 'Sending 100 USDT to Lee',
                wanting: 'USA to China',
                description: 'Send 100 USDT To Lee'
            },
            {
                id: '2',
                type: 'Send',
                offering: 'Sending 500 EUR to Maria',
                wanting: 'Germany to Spain',
                description: 'Send 500 EUR To Maria'
            },
            {
                id: '3',
                type: 'Send',
                offering: 'Sending 250 CAD to Ahmed',
                wanting: 'Canada to Morocco',
                description: 'Send 250 CAD To Ahmed'
            },
            {
                id: '4',
                type: 'Send',
                offering: 'Sending 150 GBP to Chioma',
                wanting: 'United Kingdom to Nigeria',
                description: 'Send 150 GBP To Chioma'
            }
        ];

        
        function navigateTo(screen) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            
            document.getElementById(screen).classList.add('active');
            currentScreen = screen;

            if (screen === 'home') {
                renderIntents();
            } else if (screen === 'success') {
                updateTimestamp();
            }
        }

        function renderIntents() {
            const intentList = document.getElementById('intent-list');
            const emptyState = document.getElementById('empty-state');
            const createAnother = document.getElementById('create-another');
            
            if (intents.length === 0) {
                intentList.style.display = 'none';
                emptyState.style.display = 'block';
                createAnother.style.display = 'none';
            } else {
                intentList.style.display = 'block';
                emptyState.style.display = 'none';
                createAnother.style.display = 'block';
                
                intentList.innerHTML = intents.map(intent => `
                    <div class="intent-card">
                        <div class="intent-header">
                            <div class="intent-content">
                                <div class="intent-badge">${intent.type}</div>
                                <p class="intent-description">${intent.description}</p>
                                <div class="intent-details">
                                    <span>Intent: <span class="intent-offering">${intent.offering}</span></span>
                                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                    <span>From: <span class="intent-wanting">${intent.wanting}</span></span>
                                </div>
                            </div>
                            <div style="margin-left: 1.5rem;">
                                <button class="btn btn-match" onclick="navigateTo('success')">
                                    Match
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        function setupFormHandling() {
            const form = document.getElementById('create-form');
            const intentType = document.getElementById('intent-type');
            const offering = document.getElementById('offering');
            const wanting = document.getElementById('wanting');
            const preview = document.getElementById('preview');
            const previewText = document.getElementById('preview-text');
            const submitBtn = document.getElementById('submit-btn');

            function updatePreview() {
                const type = intentType.value;
                const offer = offering.value;
                const want = wanting.value;
                
                if (type && offer && want) {
                    preview.style.display = 'block';
                    previewText.textContent = `${type} ${offer} To ${want}`;
                    submitBtn.disabled = false;
                } else {
                    preview.style.display = 'none';
                    submitBtn.disabled = true;
                }
            }

            [intentType, offering, wanting].forEach(input => {
                input.addEventListener('input', updatePreview);
                input.addEventListener('change', updatePreview);
            });

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const type = intentType.value;
                const offer = offering.value;
                const want = wanting.value;
                
                if (!type || !offer || !want) return;

                const newIntent = {
                    id: Date.now().toString(),
                    type: type,
                    offering: offer,
                    wanting: want,
                    description: `${type} ${offer} for ${want}`
                };

                intents.push(newIntent);

                form.reset();
                preview.style.display = 'none';
                submitBtn.disabled = true;
                
                navigateTo('success');
            });
        }

        function updateTimestamp() {
            const timestampElement = document.getElementById('timestamp');
            if (timestampElement) {
                timestampElement.textContent = new Date().toLocaleTimeString();
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            setupFormHandling();
            renderIntents();
        });