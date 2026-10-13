const text = 'Right to privacy relating to self-identity is very dear to every human being and well protected under Article 21 of the Constitution. In this context, examine the effect of the amendment in 2026, to the Transgender Persons (Protection of Rights) Act, 2019.';
const candidates = ['privacy', 'transgender', 'persons', 'protected under article 21', 'the transgender persons (protection of rights) act'];
const sorted = candidates.sort((a,b) => b.length - a.length);
const escaped = sorted.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const regex = new RegExp('\\b(' + escaped.join('|') + ')\\b', 'gi');
console.log(text.replace(regex, '<span class="kw-highlight">$1</span>'));
