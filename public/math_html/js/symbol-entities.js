/*
 MLQ - WYSIWYG MathML editor
 All rights reserved. CQRL Bits LLP � 2023 (cqrlbits@gmail.com)
*/

var mathFragments = {
    "sub": "<msub><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow></msub>",
    "sup": "<msup><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow></msup>",
    "subsup": "<msubsup><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow></msubsup>",
    "under": "<munder><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow></munder>",
    "over": "<mover><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow></mover>",
    "underover": "<munderover><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow></munderover>",
    "multiscripts":"<mmultiscripts><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow><mprescripts></mprescripts><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow></mmultiscripts>",
    "frac": "<mfrac><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow></mfrac>",
    "frac0": "<mfrac linethickness='0'><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow></mfrac>",
    "div": "<mlongdiv longdivstyle='lefttop'><mn>&square;</mn><mn>&square;</mn><mn>&square;</mn><msgroup position='2' shift='-1'><msgroup><mn>&square;</mn><msline length='2'></msline></msgroup><msgroup><mn>&square;</mn><mn>&square;</mn><msline length='2'></msline></msgroup></msgroup></mlongdiv>",
    "matrix": "<mo>(</mo><mtable><mtr><mtd><mi>&square;</mi></mtd><mtd><mi>&square;</mi></mtd><mtd><mi>&square;</mi></mtd></mtr><mtr><mtd><mi>&square;</mi></mtd><mtd><mi>&square;</mi></mtd><mtd><mi>&square;</mi></mtd></mtr><mtr><mtd><mi>&square;</mi></mtd><mtd><mi>&square;</mi></mtd><mtd><mi>&square;</mi></mtd></mtr></mtable><mo>)</mo>",
    "fence": "<mrow><mo>(</mo><mi>&square;</mi><mo>)</mo></mrow>",
    "sqrt": "<msqrt><mrow><mi>&square;</mi></mrow></msqrt>",
    "root": "<mroot><mrow><mi>&square;</mi></mrow><mrow><mi>&square;</mi></mrow></mroot>",
    "text": "<mrow><mtext>&square;</mtext></mrow>",
    "options": "<mrow><mo>(</mo><mtable><mtr><mtd><mi>&square;</mi></mtd><mtd><mi>&square;</mi></mtd></mtr><mtr><mtd><mi>&square;</mi></mtd><mtd><mi>&square;</mi></mtd></mtr></mtable><mo>)</mo></mrow>",
    "alpha": "<mi>&alpha;</mi>",
    "beta": "<mi>&beta;</mi>",
    "gamma": "<mi>&gamma;</mi>",
    "epsilon": "<mi>&epsilon;</mi>",
    "Delta": "<mi>&Delta;</mi>",
    "sum": "<mi>&sum;</mi>",
    "integral": "<mi>&int;</mi>",
    "partial": "<mi>&#x2202;</mi>",
    'alpha':'<mi>&alpha;</mi>',
    'beta':'<mi>&beta;</mi>',
    'gamma':'<mi>&gamma;</mi>',
    'delta':'<mi>&delta;</mi>',
    'epsilon':'<mi>&epsilon;</mi>',
    'zeta':'<mi>&zeta;</mi>',
    'eta':'<mi>&eta;</mi>',
    'theta':'<mi>&theta;</mi>',
    'iota':'<mi>&iota;</mi>',
    'kappa':'<mi>&kappa;</mi>',
    'lambda':'<mi>&lambda;</mi>',
    'mu':'<mi>&mu;</mi>',
    'nu':'<mi>&nu;</mi>',
    'xi':'<mi>&xi;</mi>',
    'omicron':'<mi>&omicron;</mi>',
    'pi':'<mi>&pi;</mi>',
    'rho':'<mi>&rho;</mi>',
    'sigmaf':'<mi>&sigmaf;</mi>',
    'sigma':'<mi>&sigma;</mi>',
    'tau':'<mi>&tau;</mi>',
    'upsilon':'<mi>&upsilon;</mi>',
    'phi':'<mi>&phi;</mi>',
    'chi':'<mi>&chi;</mi>',
    'psi':'<mi>&psi;</mi>',
    'omega':'<mi>&omega;</mi>',
    'thetasym':'<mi>&thetasym;</mi>',
    'upsih':'<mi>&upsih;</mi>',
    'piv':'<mi>&piv;</mi>',
    'Gamma':'<mi>&Gamma;</mi>',
    'Delta':'<mi>&Delta;</mi>',    
    'Theta':'<mi>&Theta;</mi>',
    'Lambda':'Lambda',
    'Xi': '&Xi;',
    'Pi':'<mi>&Pi;</mi>',
    'Sigma':'<mi>&Sigma;</mi>',
    'Phi':'<mi>&Phi;</mi>',
    'Psi':'<mi>&Psi;</mi>',
    'Omega':'<mi>&Omega;</mi>',
    'not':'<mi>&not;</mi>',
    'plusmn':'<mi>&plusmn;</mi>',
    'middot':'<mi>&middot;</mi>',
    'divide':'<mi>&divide;</mi>',
    'forall':'<mi>&forall;</mi>',
    'part':'<mi>&part;</mi>',
    'exist':'<mi>&exist;</mi>',
    'empty':'<mi>&empty;</mi>',
    'nabla':'<mi>&nabla;</mi>',
    'isin':'<mi>&isin;</mi>',
    'notin':'<mi>&notin;</mi>',
    'ni':'<mi>&ni;</mi>',
    'prod':'<mi>&prod;</mi>',
    'sum':'<mi>&sum;</mi>',
    'cap':'<mi>&cap;</mi>',
    'cup':'<mi>&cup;</mi>',
    'int':'<mi>&int;</mi>',
    'minus':'<mi>&minus;</mi>',
    'lowast':'<mi>&lowast;</mi>',
    'radic':'<mi>&radic;</mi>',
    'prop':'<mi>&prop;</mi>',
    'infin':'<mi>&infin;</mi>',
    'ang':'<mi>&ang;</mi>',
    'and':'<mi>&and;</mi>',
    'or':'<mi>&or;</mi>',
    'there4':'<mi>&there4;</mi>',
    'sim':'<mi>&sim;</mi>',
    'cong':'<mi>&cong;</mi>',
    'asymp':'<mi>&asymp;</mi>',
    'ne':'<mi>&ne;</mi>',
    'equiv':'<mi>&equiv;</mi>',
    'le':'<mi>&le;</mi>',
    'ge':'<mi>&ge;</mi>',
    'subset':'<mi>&sub;</mi>',
    'supset':'<mi>&sup;</mi>',
    'nsub':'<mi>&nsub;</mi>',
    'sube':'<mi>&sube;</mi>',
    'supe':'<mi>&supe;</mi>',
    'oplus':'<mi>&oplus;</mi>',
    'otimes':'<mi>&otimes;</mi>',
    'perp':'<mi>&perp;</mi>',
    'sdot':'<mi>&sdot;</mi>'
}
