import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameCase'
})
export class NameCasePipe implements PipeTransform {

  transform(value: string): any {
    if (!value) return null;

    // remove numbers and special characters except for:  - '
    value = value.replace(/[\d&\/\\#,+()$~%.":*?<>{}]+/g, '');

    let words = value.split(' ');
    for (var i = 0; i < words.length; i++) {
      let word = words[i].toLowerCase();

      if(i > 0 && this.isLowerException(word)) {
        // if the exception is in the 2nd or more position, keep it lower case.
        words[i] = word;
      } else if (i === (words.length -1) && this.isSuffixException(word)) {
        // if the last word contains an exception, then lets add comma and upper case it.
        words[i-1] += ", " + word.toUpperCase();
        words.splice(i, 1);
      } else {
        words[i] = this.format(word);
      }
    }
    return words.join(' ');
  }

  private format(word: string) {
    if (this.isHyphenated(word)) {
      word = this.hyphenLetterCase(word);
    } else if (this.beginsWith3CharString(word)) {
      word = this.formatFirstThreeLetters(word);
    } else if (this.beginsWith2CharString(word)) {
      word = this.formatFirstTwoLetters(word);
    } else if (this.beginsWithMc(word)) {
      word = this.formatFirstTwoLetters(word);
    } else if (this.hasApostrophe(word)) {
      word = this.formatFirstTwoLetters(word);
    }
    else {
      word = this.formatFirstLetter(word);
    }

    return word;
  }

  private hyphenLetterCase(word: string): string {
    let concatName = "";

    let words = word.split('-');
    for (var i = 0; i < words.length; i++) {
      word = words[i];
      if (word.length > 0) {
        if (this.beginsWith3CharString(word)) {
          concatName += this.formatFirstThreeLetters(word) + "-";
        } else if (this.beginsWith2CharString(word)) {
          concatName += this.formatFirstTwoLetters(word) + "-";
        } else if (this.beginsWithMc(word)) {
          concatName += this.formatFirstTwoLetters(word) + "-";
        } else if (this.hasApostrophe(word)) {
          concatName += this.formatFirstTwoLetters(word) + "-";
        }
        else {
          concatName += this.formatFirstLetter(word) + "-";
        }
      }
    }

    return concatName.substring(0, concatName.length - 1);
  }

  // Begins with Mac, Van
  private beginsWith3CharString(word: string): boolean {
    let ss = [
      'macadam', 'macadams', 'macaddam', 'macadie', 'macafee', 'macalaster', 'macalister', 'macallan', 'macallen', 'macalley', 'macallister', 'macally', 'macanally', 'macandrew', 'macangus',
      'macanselan', 'macantil', 'macarthur', 'macaulay', 'macauley', 'macawley', 'macbaker', 'macbean', 'macbee', 'macbeen', 'macbride', 'macbryde', 'maccall', 'maccallan', 'maccalley',
      'maccampbell', 'maccane', 'maccarmack', 'maccarthy', 'maccathiain', 'maccavish', 'maccein', 'macceney', 'macclain', 'macclancy', 'macclaren', 'macclay', 'macclellan', 'maccoll', 'maccomb',
      'maccombie', 'macconcarraig', 'macconnel', 'macconnell', 'maccoone', 'maccord', 'maccordum', 'maccormack', 'maccourt', 'maccoy', 'maccracken', 'maccrain', 'macculley', 'maccully',
      'maccurdy', 'maccuric', 'maccurtin', 'macdaid', 'macdanal', 'macdanald', 'macdaniel', 'macdannal', 'macdannell', 'macdanold', 'macdermid', 'macdiarmid', 'macdonald', 'macdonell',
      'macdonnel', 'macdonnell', 'macdonnsliebhe', 'macdouall', 'macdougal', 'macdougald', 'macdougall', 'macdowall', 'macdowel', 'macdowell', 'macduffie', 'macduffy', 'maceachan', 'maceachen',
      'macegan', 'maceoghain', 'maceohain', 'macewan', 'macewen', 'macewing', 'macfadyen', 'macfarland', 'macfee', 'macfergus', 'macfhionnlaoich', 'macfhlannchaidh', 'macfie', 'macgee',
      'macghee', 'macgill', 'macgmur', 'macgregor', 'macgrowther', 'macgruder', 'macguigan', 'macguire', 'macguyer', 'macgyuer', 'machaley', 'machendry', 'machenry', 'maciain', 'macian',
      'macinnis', 'macintaylor', 'macintyre', 'macirish', 'macisaac', 'mackain', 'mackane', 'mackean', 'mackeen', 'mackendrick', 'mackenrick', 'mackenzie', 'mackey', 'mackindlay', 'mackinley',
      'mackinnis', 'mackirdie', 'mackmillion', 'macknight', 'macknown', 'mackorda', 'maclachlan', 'maclachlane', 'maclain', 'maclaine', 'maclamb', 'maclamore', 'maclane', 'maclaren', 'maclauchlan',
      'maclauchlane', 'maclaughlan', 'maclaughlen', 'maclaughlin', 'maclaurin', 'maclea', 'maclean', 'maclearen', 'macleay', 'maclelan', 'maclellan', 'maclennan', 'macleod', 'maclochlainn', 'macloughlin',
      'macmahan', 'macmahon', 'macmanus', 'macmartin', 'macmaster', 'macmasters', 'macmath', 'macmathon', 'macmhathain', 'macmillan', 'macmillen', 'macmillian', 'macmullan', 'macmullin',
      'macmurchadha', 'macmurrough', 'macmurtrie', 'macmurtry', 'macnachten', 'macnair', 'macnamara', 'macnaughton', 'macneil', 'macneill', 'macnichol', 'macnickle', 'macnicol', 'macnown',
      'maconlea', 'macoric', 'macowen', 'macparlain', 'macparlan', 'macpeters', 'macphedron', 'macphie', 'macphun', 'macqueen', 'macqueene', 'macquilkan', 'macquinn', 'macquire', 'macquiston',
      'macrae', 'macranald', 'macrannald', 'macreynold', 'macreynolds', 'macseain', 'macseney', 'macsimi', 'macsum', 'mactaggart', 'mactamais', 'mactamhais', 'mactavis', 'mactavish', 'mactaylor,',
      'macthomas', 'mactiernan', 'mactighe', 'mactighernan', 'macvean', 'macvee', 'macwatt', 'macwattie', 'macwhorter', 'macwilliam', 'macwilliams', 'mactamhais', 'mactammany', 'mactause',
      'maccosh', 'maccash', 'maccarthy', 'maccarthaig', 'maccamish', 'macaskill',
      'vansteenbergh', 'vanarsdale', 'vanarsdalen', 'vandemerwe', 'vanderheijden', 'vanderheyden', 'vandermerwe', 'vannatta', 'vanseters', 'vandyke', 'vannorstran', 'vartakhatoun'
    ];

    return ss.includes(word);
  }

  // Begins with De, La, Le, Di
  private beginsWith2CharString(word: string): boolean {
    let ss = [
      'deblasio', 'debois', 'deboys', 'debruijn', 'debruyn', 'deconinck', 'decoursey', 'dedomenico', 'dedoming', 'dedominge', 'delong', 'demena', 'demarco', 'deniro', 'depass', 'depaz',
      'depue', 'dequerton', 'derevere', 'derkaverian', 'deroche', 'devary', 'devito', 'devore', 'dewaller', 'dewarren', 'dewine', 'dewire', 'dewitt', 'dewolf',
      'labach', 'laboon', 'labrecque', 'lacharite', 'lafabre', 'laferney', 'lafontaine', 'lapage', 'lapeer', 'lapierre', 'laroche', 'larochelle', 'larose', 'larue', 'latour', 'lavigne',
      'leblanc', 'lebon', 'lebrock', 'lejuis', 'lemarquis', 'lemond', 'lenormand', 'lepage', 'leroy', 'letourneau', 'leveler',
      'dibenedetto', 'dicaprio', 'dicesare', 'dicrescenzo', 'digiacomo', 'digregorio', 'dimartino', 'disalvo'
    ];

    return ss.includes(word);
  }

  // Begins with Mc
  private beginsWithMc(word: string): boolean {
    if (word.length > 3 && word.substring(0, 2) === 'mc')
      return true;

    return false;
  }

  // Names like:  M'Farlane, O'Brian, D'Alessandro, L'Hommedieu
  private hasApostrophe(word: string): boolean {
    if (word.length > 2 && word.indexOf("'", 1) > -1)
      return true;

    return false;
  }

  // Contains a hyphen?
  private isHyphenated(word: string): boolean {
    if (word.length > 3 && word.indexOf('-') > -1)
      return true;

    return false;
  }

  // If these name are not the first word, do not capitalize
  private isLowerException(word: string): boolean {
    let words = [
      "van", "von", "la", "de", "da", "di", "los"
    ];

    return words.includes(word);
  }

  private isSuffixException(word: string): boolean {
    let words = [
      "md", "lp", "llc", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"
    ];

    return words.includes(word);
  }

  private formatFirstLetter(word: string): string {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  }

  private formatFirstTwoLetters(word: string): string {
    return word.substring(0, 1).toUpperCase() + word.substring(1, 2) + word.substring(2, 3).toUpperCase() + word.substring(3);
  }

  private formatFirstThreeLetters(word: string): string {
    return word.substring(0, 1).toUpperCase() + word.substring(1, 3) + word.substring(3, 4).toUpperCase() + word.substring(4);
  }
}