/**
 * Blog post data store.
 *
 * To add a new blog post:
 * 1. Add an entry to the `posts` array below
 * 2. Set `published: true` when it's ready
 * 3. Write the `content` as an array of HTML strings (each is a paragraph or section)
 *
 * Content supports raw HTML for rich formatting:
 *   - <h2>, <h3> for section headings
 *   - <ul>/<ol>/<li> for lists
 *   - <strong>, <em> for emphasis
 *   - <blockquote> for callouts
 *   - <a href="..."> for links
 */

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  metaDescription: string
  published: boolean
  content: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'how-to-move-a-data-center',
    title: 'How to Move a Data Center: The Complete 2025 Guide',
    excerpt:
      'Everything you need to know about data center relocation — from planning and risk assessment to execution and post-move validation. Built from 14,200+ rack moves.',
    category: 'Data Center Relocation',
    readTime: '12 min read',
    date: '2026-02-10',
    metaDescription:
      'Complete guide to data center relocation in 2025. Learn the planning process, risk mitigation strategies, and execution best practices from 14,200+ successful rack moves.',
    published: true,
    content: [
      '<p>Moving a data center is one of the highest-stakes projects an IT team can undertake. Get it right, and your business barely notices. Get it wrong, and you\'re looking at extended downtime, damaged equipment, and a compliance nightmare that takes months to clean up.</p>',
      
      '<p>This guide covers everything you need to know about planning and executing a data center relocation — whether you\'re moving 10 racks or 500.</p>',
      
      '<h2>Why Data Center Moves Fail</h2>',
      
      '<p>Before we get into the how, let\'s talk about why data center moves go sideways. After working with thousands of enterprise IT teams, the failures almost always come down to three things:</p>',
      
      '<ul><li><strong>Underestimating the scope:</strong> "We\'ll just move it over the weekend" turns into a multi-week disaster when you realize you forgot about legacy systems, undocumented dependencies, and that one server nobody knows what it does but everyone\'s afraid to turn off.</li><li><strong>Hiring the wrong movers:</strong> General freight companies don\'t understand IT equipment. Shock damage, temperature exposure, and broken chain of custody are the norm, not the exception.</li><li><strong>Skipping the dry run:</strong> If your first test of the migration plan is the actual migration, you\'re gambling with your infrastructure.</li></ul>',
      
      '<h2>Phase 1: Assessment and Planning (8-12 Weeks Out)</h2>',
      
      '<p>The planning phase is where most of the real work happens. Rushing this stage is the #1 predictor of problems during the actual move.</p>',
      
      '<h3>Complete Asset Inventory</h3>',
      
      '<p>You need a serial-level inventory of every piece of equipment that\'s moving. This includes:</p>',
      
      '<ul><li>Servers, storage arrays, and networking equipment</li><li>Power distribution units (PDUs) and UPS systems</li><li>Cabling — network, power, fiber, and any legacy connections</li><li>Environmental sensors and monitoring equipment</li><li>Physical security systems tied to the data center</li></ul>',
      
      '<p>Don\'t trust your CMDB. Walk the floor. We\'ve seen moves where the inventory was off by 15-20% because of shadow IT, decommissioned-but-not-removed equipment, and systems that were "temporary" five years ago.</p>',
      
      '<h3>Dependency Mapping</h3>',
      
      '<p>For every system that\'s moving, document:</p>',
      
      '<ul><li>What depends on it (upstream)</li><li>What it depends on (downstream)</li><li>Network connectivity requirements</li><li>Power requirements and redundancy needs</li><li>Cooling requirements</li></ul>',
      
      '<p>This mapping determines your migration sequence. Systems with zero dependencies can move anytime. Systems that everything depends on need to move last — and come up first.</p>',
      
      '<h3>Risk Assessment</h3>',
      
      '<p>Every data center move involves risk. Your job is to identify and mitigate, not eliminate. Key risks to assess:</p>',
      
      '<ul><li><strong>Downtime tolerance:</strong> What\'s the cost per hour of downtime for each system?</li><li><strong>Data sensitivity:</strong> Are there regulatory requirements (HIPAA, PCI, SOX) that affect how equipment can be transported?</li><li><strong>Physical risks:</strong> Shock, vibration, temperature, humidity during transport</li><li><strong>Security risks:</strong> Chain of custody, facility access, personnel clearances</li></ul>',
      
      '<h2>Phase 2: Vendor Selection (6-8 Weeks Out)</h2>',
      
      '<p>Choosing the right logistics partner is critical. This is not a job for a general moving company or freight broker.</p>',
      
      '<h3>What to Look For</h3>',
      
      '<ul><li><strong>IT-specific experience:</strong> Have they moved data centers before? How many? What size?</li><li><strong>Proper equipment:</strong> Air-ride trucks, shock pallets, climate control capabilities</li><li><strong>Insurance:</strong> Cargo insurance that covers the full replacement value of your equipment</li><li><strong>Chain of custody protocols:</strong> Serial-level tracking, tamper-evident seals, GPS monitoring</li><li><strong>Background-checked crews:</strong> Especially important if you have clearance requirements</li></ul>',
      
      '<h3>Red Flags</h3>',
      
      '<ul><li>Can\'t provide references from similar-sized moves</li><li>Quotes significantly below market rate (usually means cut corners)</li><li>Unwilling to commit to chain of custody documentation</li><li>No dedicated project manager for your move</li></ul>',
      
      '<blockquote><strong>Pro tip:</strong> If you don\'t have time to vet vendors yourself, a matching service like PowerRoute can connect you with pre-vetted providers who specialize in your specific type of move.</blockquote>',
      
      '<h2>Phase 3: Preparation (2-4 Weeks Out)</h2>',
      
      '<h3>Change Management</h3>',
      
      '<p>File change requests for every system being migrated. This isn\'t bureaucracy — it\'s documentation that will save you during the post-move audit.</p>',
      
      '<h3>Communication Plan</h3>',
      
      '<p>Everyone affected needs to know:</p>',
      
      '<ul><li>What\'s moving and when</li><li>Expected downtime windows</li><li>Who to contact if something goes wrong</li><li>Rollback procedures if the move fails</li></ul>',
      
      '<h3>Dry Run</h3>',
      
      '<p>For critical systems, run a migration dry run. Fail over to backup, verify functionality, fail back. This catches problems while you still have time to fix them.</p>',
      
      '<h2>Phase 4: Execution</h2>',
      
      '<p>The actual move should be the most boring part of the project. If you\'ve done the planning right, execution is just following the playbook.</p>',
      
      '<h3>Move Day Checklist</h3>',
      
      '<ul><li>Verify all systems are cleanly shut down</li><li>Complete serial-number inventory before anything leaves</li><li>Photograph rack configurations and cable runs</li><li>Apply tamper-evident seals to all containers</li><li>Confirm GPS tracking is active</li><li>Verify destination facility is ready to receive</li></ul>',
      
      '<h3>At the Destination</h3>',
      
      '<ul><li>Verify seal integrity before unpacking</li><li>Complete serial-number inventory upon arrival</li><li>Install equipment per the rack diagrams</li><li>Reconnect cabling per documentation</li><li>Power-on validation for each system</li><li>Application-level testing</li></ul>',
      
      '<h2>Phase 5: Post-Move Validation</h2>',
      
      '<p>The move isn\'t done until everything is verified working and documented.</p>',
      
      '<ul><li><strong>Inventory reconciliation:</strong> Every asset that left should have arrived</li><li><strong>Functionality testing:</strong> Every system should be operating normally</li><li><strong>Performance baseline:</strong> Compare against pre-move baselines</li><li><strong>Documentation update:</strong> CMDB, network diagrams, runbooks</li><li><strong>Chain of custody closeout:</strong> File all documentation for audit purposes</li></ul>',
      
      '<h2>Common Questions</h2>',
      
      '<h3>How long does a data center move take?</h3>',
      
      '<p>Depends on size. A 10-rack move might happen over a weekend. A 500-rack move could take months of phased migration. Plan for longer than you think — rushed moves create problems.</p>',
      
      '<h3>Can we do this with internal resources?</h3>',
      
      '<p>For small moves, maybe. But your IT team\'s job is running systems, not moving them. The risk of damage, extended downtime, or compliance failures usually outweighs any savings from DIY.</p>',
      
      '<h3>What does a data center move cost?</h3>',
      
      '<p>Varies wildly based on distance, equipment volume, complexity, and timeline. Get quotes from multiple qualified providers. Budget 10-20% contingency for surprises.</p>',
      
      '<h2>Next Steps</h2>',
      
      '<p>If you\'re planning a data center relocation and want to skip the vendor vetting process, PowerRoute can match you with pre-vetted providers who specialize in exactly your type of move. It\'s free, takes about 3 minutes, and you\'ll typically hear from a matched provider within hours.</p>',
    ],
  },
  {
    slug: 'vetting-it-logistics-providers',
    title: 'How to Vet an IT Logistics Provider (5 Things to Check)',
    excerpt:
      'The 5 things to verify before you trust anyone with your servers. Certifications, insurance, crew quality, equipment, and references.',
    category: 'Vendor Selection',
    readTime: '7 min read',
    date: '2026-02-08',
    metaDescription:
      'Learn the 5 critical things to verify before hiring an IT logistics provider. From insurance to crew quality, here\'s how to avoid costly mistakes.',
    published: true,
    content: [
      '<p>Hiring the wrong IT logistics provider doesn\'t just cost money — it costs time, reputation, and potentially your compliance standing. We\'ve seen companies learn this the hard way: damaged servers, broken chain of custody, and crews that showed up without the right clearances.</p>',
      
      '<p>Here are the 5 things you need to verify before trusting anyone with your equipment.</p>',
      
      '<h2>1. Insurance Coverage</h2>',
      
      '<p>This is the first thing to check, and the thing most people check wrong.</p>',
      
      '<p>A logistics provider will tell you they\'re "fully insured." That\'s meaningless without specifics. What you need to verify:</p>',
      
      '<ul><li><strong>Cargo insurance:</strong> Covers the actual equipment being transported. Get the per-shipment limit in writing.</li><li><strong>General liability:</strong> Covers damage to your facility during loading/unloading.</li><li><strong>Workers\' compensation:</strong> Protects you if a crew member is injured on your property.</li><li><strong>Auto liability:</strong> Covers accidents during transport.</li></ul>',
      
      '<p><strong>Key question to ask:</strong> "What\'s your cargo insurance limit per shipment, and can you provide a certificate of insurance naming us as additionally insured?"</p>',
      
      '<p>If they hesitate or can\'t provide a COI within 24 hours, move on.</p>',
      
      '<h2>2. Equipment and Capabilities</h2>',
      
      '<p>IT equipment isn\'t furniture. It requires specialized handling.</p>',
      
      '<p><strong>Transport equipment to verify:</strong></p>',
      
      '<ul><li><strong>Air-ride suspension:</strong> Standard truck suspension will shake your servers apart. Air-ride dampens vibration.</li><li><strong>Climate control:</strong> Temperature and humidity extremes damage electronics. Climate-controlled trucks are non-negotiable for sensitive equipment.</li><li><strong>Shock pallets:</strong> Purpose-built pallets that absorb impact during loading, transport, and unloading.</li><li><strong>Lift gates:</strong> Proper loading equipment that doesn\'t require forklifts inside the truck.</li></ul>',
      
      '<p><strong>Key question to ask:</strong> "Walk me through how you\'d transport a fully-loaded server rack from our facility to the destination."</p>',
      
      '<p>Listen for specifics about shock protection, securement, and climate control. Vague answers mean they\'re figuring it out as they go.</p>',
      
      '<h2>3. Crew Quality and Clearances</h2>',
      
      '<p>The crew handling your equipment matters as much as the equipment they use.</p>',
      
      '<p><strong>What to verify:</strong></p>',
      
      '<ul><li><strong>Background checks:</strong> Every crew member should be background-checked. Get this in writing.</li><li><strong>ID verification:</strong> Crew should arrive with valid government ID. If your facility requires it, verify they can provide it.</li><li><strong>Security clearances:</strong> If you\'re in a regulated industry or government space, ask about clearance levels their crews hold.</li><li><strong>IT-specific training:</strong> Have they worked with data center equipment before? Rack and stack experience?</li></ul>',
      
      '<p><strong>Key question to ask:</strong> "Are your crew members W-2 employees or subcontractors? What\'s your background check process?"</p>',
      
      '<p>Companies that use day-labor subcontractors have less control over crew quality. That doesn\'t mean they\'re bad — but it means you need to ask more questions.</p>',
      
      '<h2>4. Chain of Custody Protocols</h2>',
      
      '<p>If you can\'t prove where your equipment was at every moment during transport, you have a compliance gap.</p>',
      
      '<p><strong>What a proper chain of custody includes:</strong></p>',
      
      '<ul><li><strong>Serial-number inventory:</strong> Every asset logged by serial number at pickup.</li><li><strong>Tamper-evident seals:</strong> Containers sealed with numbered seals that show if they\'ve been opened.</li><li><strong>GPS tracking:</strong> Real-time location tracking during transport.</li><li><strong>Timestamped handoffs:</strong> Documented transfer of custody at pickup and delivery.</li><li><strong>Photo documentation:</strong> Photos of equipment condition at pickup and delivery.</li></ul>',
      
      '<p><strong>Key question to ask:</strong> "Can you show me a sample chain of custody report from a recent job?"</p>',
      
      '<p>If they can\'t produce one, or it\'s just a basic bill of lading, their process isn\'t audit-ready.</p>',
      
      '<h2>5. References and Track Record</h2>',
      
      '<p>Past performance is the best predictor of future results.</p>',
      
      '<p><strong>What to ask for:</strong></p>',
      
      '<ul><li><strong>References from similar jobs:</strong> Same size, same type of equipment, same industry if possible.</li><li><strong>Specific outcomes:</strong> Not just "they were great" — ask about timeline, damage rate, documentation quality.</li><li><strong>Problems and resolution:</strong> How did they handle issues when things went wrong?</li></ul>',
      
      '<p><strong>Questions for references:</strong></p>',
      
      '<ul><li>"Did they deliver on the timeline they committed to?"</li><li>"Was there any equipment damage? How was it handled?"</li><li>"Would you use them again without hesitation?"</li></ul>',
      
      '<p>Two or three solid references from similar-sized organizations doing similar work is enough. If they can\'t provide that, they\'re either new or their past clients won\'t vouch for them.</p>',
      
      '<h2>Red Flags to Watch For</h2>',
      
      '<p>Beyond the 5 things to check, here are warning signs that should make you walk away:</p>',
      
      '<ul><li><strong>Quotes significantly below market:</strong> Cheap usually means cut corners.</li><li><strong>No dedicated project manager:</strong> You should have a single point of contact, not a call center.</li><li><strong>Reluctance to put things in writing:</strong> If they won\'t commit to specs, insurance limits, or protocols in the contract, they\'re not planning to deliver them.</li><li><strong>Pressure to decide quickly:</strong> Legitimate providers understand you need time to vet them.</li><li><strong>"We can handle anything":</strong> Specialists are better than generalists for IT logistics. Be wary of companies that claim to do everything.</li></ul>',
      
      '<h2>The Time Investment</h2>',
      
      '<p>Properly vetting a logistics provider takes 1-2 weeks if you\'re doing it yourself. That includes:</p>',
      
      '<ul><li>Getting quotes from 3-5 providers</li><li>Verifying insurance and requesting COIs</li><li>Checking references</li><li>Reviewing sample documentation</li><li>Comparing capabilities and pricing</li></ul>',
      
      '<p>If you don\'t have that time — or don\'t want to do that work — services like PowerRoute maintain pre-vetted networks of providers. We\'ve already done the vetting, so you can go straight to getting quotes from qualified providers.</p>',
      
      '<h2>Bottom Line</h2>',
      
      '<p>The right logistics provider protects your equipment, your timeline, and your compliance standing. The wrong one creates problems that take months to clean up.</p>',
      
      '<p>Take the time to vet properly. Or let someone who\'s already done the work connect you with providers who\'ve passed the test.</p>',
    ],
  },
  {
    slug: 'chain-of-custody-best-practices',
    title: 'Chain of Custody for IT Assets: What Actually Passes an Audit',
    excerpt:
      'From serial-number inventory to tamper-evident seals to verified handoff — the chain of custody protocol that passes every audit.',
    category: 'Compliance',
    readTime: '6 min read',
    date: '2026-02-05',
    metaDescription:
      'Learn what chain of custody documentation auditors actually look for when reviewing IT asset transport and disposition. Includes practical protocols and examples.',
    published: true,
    content: [
      '<p>Your auditor doesn\'t care that the move "went fine." They care about documentation. Can you prove, with timestamped records, exactly where every asset was at every moment? If not, you have a gap — and gaps become findings.</p>',
      
      '<p>This guide covers what auditors actually look for in chain of custody documentation, and how to make sure your IT asset transport passes review.</p>',
      
      '<h2>What Chain of Custody Actually Means</h2>',
      
      '<p>Chain of custody is the documented chronological history of who had control of an asset, when, and what happened while it was in their control.</p>',
      
      '<p>For IT assets, this matters because:</p>',
      
      '<ul><li><strong>Data security:</strong> If drives were out of your control with no documentation, you can\'t prove data wasn\'t accessed.</li><li><strong>Regulatory compliance:</strong> HIPAA, PCI-DSS, SOX, and GDPR all have requirements around asset handling.</li><li><strong>Loss prevention:</strong> Documented custody creates accountability and reduces theft.</li><li><strong>Insurance claims:</strong> If something is damaged or lost, you need documentation to file a claim.</li></ul>',
      
      '<h2>The 6 Elements Auditors Check</h2>',
      
      '<h3>1. Asset-Level Identification</h3>',
      
      '<p>Every asset must be individually identified, typically by serial number. "One pallet of servers" doesn\'t cut it.</p>',
      
      '<p><strong>What auditors look for:</strong></p>',
      
      '<ul><li>Serial number recorded for every item</li><li>Asset tag or barcode if applicable</li><li>Make, model, and description</li><li>Condition notes at time of transfer</li></ul>',
      
      '<p><strong>Failure mode:</strong> Inventory lists that use quantities instead of serial numbers. "10 Dell servers" doesn\'t prove which 10 servers.</p>',
      
      '<h3>2. Transfer Documentation</h3>',
      
      '<p>Every time custody changes hands, there should be a documented handoff.</p>',
      
      '<p><strong>What auditors look for:</strong></p>',
      
      '<ul><li>Date and time of transfer</li><li>Location of transfer</li><li>Name and signature of person releasing custody</li><li>Name and signature of person accepting custody</li><li>Condition at time of transfer</li></ul>',
      
      '<p><strong>Failure mode:</strong> Missing signatures, missing timestamps, or transfers that happened without documentation ("the driver just took it").</p>',
      
      '<h3>3. Physical Security During Transport</h3>',
      
      '<p>While assets are in transit, there should be documented controls preventing unauthorized access.</p>',
      
      '<p><strong>What auditors look for:</strong></p>',
      
      '<ul><li>Tamper-evident seals with unique identifiers</li><li>Seal numbers recorded at origin and verified at destination</li><li>Documentation of any seal breaks (and explanation)</li><li>Locked containers or secure compartments</li></ul>',
      
      '<p><strong>Failure mode:</strong> Seals not used, seal numbers not recorded, or seals that were broken with no incident documentation.</p>',
      
      '<h3>4. Location Tracking</h3>',
      
      '<p>You should be able to show where assets were at any point during transport.</p>',
      
      '<p><strong>What auditors look for:</strong></p>',
      
      '<ul><li>GPS tracking logs for transport vehicles</li><li>Timestamped location records</li><li>Documentation of any stops or delays</li><li>Route documentation matching expected path</li></ul>',
      
      '<p><strong>Failure mode:</strong> No GPS tracking, or tracking that has gaps. "The truck\'s GPS was off for 3 hours" is a finding waiting to happen.</p>',
      
      '<h3>5. Personnel Documentation</h3>',
      
      '<p>Who handled the assets? Can you verify they were authorized?</p>',
      
      '<p><strong>What auditors look for:</strong></p>',
      
      '<ul><li>Names of all personnel who handled assets</li><li>Verification of identity (government ID check)</li><li>Background check status if required</li><li>Clearance levels if applicable</li></ul>',
      
      '<p><strong>Failure mode:</strong> Unknown personnel on the crew, no ID verification documented, or clearance requirements not verified.</p>',
      
      '<h3>6. Reconciliation at Destination</h3>',
      
      '<p>The chain closes when assets are received and verified at the destination.</p>',
      
      '<p><strong>What auditors look for:</strong></p>',
      
      '<ul><li>Complete inventory verification (every serial number accounted for)</li><li>Seal integrity verification</li><li>Condition comparison to origin documentation</li><li>Discrepancy documentation if anything is different</li><li>Final acceptance signature</li></ul>',
      
      '<p><strong>Failure mode:</strong> "We counted the boxes" instead of serial-level verification. Or no documentation of seal verification.</p>',
      
      '<h2>What Good Documentation Looks Like</h2>',
      
      '<p>A complete chain of custody package for a transport job should include:</p>',
      
      '<ul><li><strong>Origin inventory:</strong> Serial-level list with condition notes, signed by releasing party</li><li><strong>Seal log:</strong> Seal numbers applied, photographed, and recorded</li><li><strong>Bill of lading:</strong> Formal transfer document with signatures</li><li><strong>GPS log:</strong> Complete route history with timestamps</li><li><strong>Personnel log:</strong> Names and ID verification for all crew</li><li><strong>Delivery receipt:</strong> Seal verification, inventory reconciliation, condition notes, acceptance signature</li><li><strong>Photos:</strong> Equipment condition at origin and destination</li></ul>',
      
      '<p>All of this should be organized, timestamped, and available as a single package when auditors ask for it.</p>',
      
      '<h2>Common Audit Findings</h2>',
      
      '<p>Based on what we see, here are the most common chain of custody findings:</p>',
      
      '<ul><li><strong>Incomplete inventory:</strong> Serial numbers missing or recorded incorrectly</li><li><strong>Missing signatures:</strong> Transfers that happened without documented handoff</li><li><strong>Seal gaps:</strong> Seals not used, not verified, or broken without incident report</li><li><strong>GPS gaps:</strong> Periods where location tracking was unavailable</li><li><strong>No reconciliation:</strong> Destination receipt that doesn\'t verify against origin inventory</li></ul>',
      
      '<p>Every one of these is preventable with proper process.</p>',
      
      '<h2>How to Get This Right</h2>',
      
      '<p>If you\'re handling transport internally, build chain of custody requirements into your process. Create checklists, train your team, and audit your own documentation before external auditors do.</p>',
      
      '<p>If you\'re using a logistics provider, make chain of custody documentation a contract requirement. Ask to see sample documentation from previous jobs. If they can\'t produce it, or it\'s incomplete, find a different provider.</p>',
      
      '<p>The providers in the PowerRoute network follow standardized chain of custody protocols — it\'s one of the things we verify before they join. If documentation quality matters to you (and it should), working with a pre-vetted provider eliminates a lot of risk.</p>',
      
      '<h2>Bottom Line</h2>',
      
      '<p>Chain of custody isn\'t paperwork for paperwork\'s sake. It\'s the documentation that proves your assets were handled properly, protects you in compliance audits, and gives you recourse if something goes wrong.</p>',
      
      '<p>Build it into your process, require it from your vendors, and keep it organized. When the auditor asks, you want to hand them a complete package — not scramble to reconstruct what happened.</p>',
    ],
  },
  {
    slug: 'data-center-relocation-checklist',
    title: 'Data Center Relocation Checklist: 47 Points Most Teams Miss',
    excerpt:
      'A comprehensive checklist covering pre-move assessment, change management, transport logistics, and post-move validation. Built from 14,200+ rack moves.',
    category: 'Data Center Relocation',
    readTime: '8 min read',
    date: '2026-01-15',
    metaDescription:
      'A 47-point checklist covering pre-move assessment, change management, transport logistics, and post-move validation for data center migrations.',
    published: false,
    content: [
      '<p>This article is currently being written by our team. Check back shortly for the full guide.</p>',
    ],
  },
  {
    slug: 'itad-compliance-guide',
    title: 'ITAD Compliance: What Your Auditor Actually Looks For',
    excerpt:
      'NIST 800-88, NAID AAA, serialized Certificates of Destruction — what the standards require and how most companies fall short.',
    category: 'ITAD & Compliance',
    readTime: '6 min read',
    date: '2026-01-08',
    metaDescription:
      'NIST 800-88, NAID AAA, serialized Certificates of Destruction — what ITAD compliance standards require and how most companies fall short.',
    published: false,
    content: [
      '<p>This article is currently being written by our team. Check back shortly for the full guide.</p>',
    ],
  },
  {
    slug: 'office-decommission-timeline',
    title: 'Office IT Decommission: What a Realistic Timeline Looks Like',
    excerpt:
      "Your lease expires in 30 days. Here's how to plan a complete IT teardown without missing your deadline or leaving data behind.",
    category: 'Office Decommission',
    readTime: '6 min read',
    date: '2025-12-05',
    metaDescription:
      "Your lease expires in 30 days. Here's how to plan a complete IT teardown without missing your deadline or leaving data behind.",
    published: false,
    content: [
      '<p>This article is currently being written by our team. Check back shortly for the full guide.</p>',
    ],
  },
  {
    slug: 'it-asset-recovery-remote-sites',
    title: 'Recovering IT Assets from Remote Sites Without Losing Your Mind',
    excerpt:
      'Branch closures, acquisitions, remote offices — how to retrieve scattered assets with full chain of custody documentation.',
    category: 'Asset Recovery',
    readTime: '5 min read',
    date: '2025-11-28',
    metaDescription:
      'Branch closures, acquisitions, remote offices — how to retrieve scattered assets with full chain of custody documentation.',
    published: false,
    content: [
      '<p>This article is currently being written by our team. Check back shortly for the full guide.</p>',
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPublishedPosts(): BlogPost[] {
  return posts.filter((p) => p.published)
}
