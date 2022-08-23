import { IMatch } from '../interfaces/IMatch';

export default class GamePoints {
  static getTotalDraws(idTeam: number, match: IMatch, path: string) {
    let count = 0;
    if (match.homeTeam === idTeam && match.homeTeamGoals === match.awayTeamGoals
      && (path === 'home' || path === 'homeAndAway')) {
      count += 1;
    }
    if (match.awayTeam === idTeam && match.homeTeamGoals === match.awayTeamGoals
      && (path === 'away' || path === 'homeAndAway')) {
      count += 1;
    }
    return count;
  }

  static totalPoints(idTeam: number, allMatches: IMatch[], path: string) {
    let count = 0;
    allMatches.forEach(async (match) => {
      if (match.homeTeam === idTeam && match.homeTeamGoals > match.awayTeamGoals
          && (path === 'home' || path === 'homeAndAway')) {
        count += 3;
      }
      if (match.awayTeam === idTeam && match.awayTeamGoals > match.homeTeamGoals
          && (path === 'away' || path === 'homeAndAway')) {
        count += 3;
      }
      count += this.getTotalDraws(idTeam, match, path);
    });
    return count;
  }

  static totalGames(idTeam: number, allMatches: IMatch[], path: string) {
    let count = 0;
    allMatches.forEach((match) => {
      if (match.homeTeam === idTeam && (path === 'home' || path === 'homeAndAway')) {
        count += 1;
      }
      if (match.awayTeam === idTeam && (path === 'away' || path === 'homeAndAway')) {
        count += 1;
      }
    });
    return count;
  }

  static totalVictories(idTeam: number, allMatches: IMatch[], path: string) {
    let count = 0;
    allMatches.forEach((match) => {
      if (match.homeTeam === idTeam && match.homeTeamGoals > match.awayTeamGoals
          && (path === 'home' || path === 'homeAndAway')) {
        count += 1;
      }
      if (match.awayTeam === idTeam && match.awayTeamGoals > match.homeTeamGoals
          && (path === 'away' || path === 'homeAndAway')) {
        count += 1;
      }
    });
    return count;
  }

  static totalDraws(idTeam: number, allMatches: IMatch[], path: string) {
    let count = 0;
    allMatches.forEach((match) => {
      if (match.homeTeam === idTeam && match.homeTeamGoals === match.awayTeamGoals
          && (path === 'home' || path === 'homeAndAway')) {
        count += 1;
      }
      if (match.awayTeam === idTeam && match.homeTeamGoals === match.awayTeamGoals
          && (path === 'away' || path === 'homeAndAway')) {
        count += 1;
      }
    });
    return count;
  }

  static totalLosses(idTeam: number, allMatches: IMatch[], path: string) {
    let count = 0;
    allMatches.forEach((match) => {
      if (match.homeTeam === idTeam && match.homeTeamGoals < match.awayTeamGoals
          && (path === 'home' || path === 'homeAndAway')) {
        count += 1;
      }
      if (match.awayTeam === idTeam && match.awayTeamGoals < match.homeTeamGoals
          && (path === 'away' || path === 'homeAndAway')) {
        count += 1;
      }
    });
    return count;
  }

  static goalsFavor(idTeam: number, allMatches: IMatch[], path: string) {
    let count = 0;
    allMatches.forEach((match) => {
      if (match.homeTeam === idTeam && (path === 'home' || path === 'homeAndAway')) {
        count += match.homeTeamGoals;
      }
      if (match.awayTeam === idTeam && (path === 'away' || path === 'homeAndAway')) {
        count += match.awayTeamGoals;
      }
    });
    return count;
  }

  static goalsOwn(idTeam: number, allMatches: IMatch[], path: string) {
    let count = 0;
    allMatches.forEach((match) => {
      if (match.homeTeam === idTeam && (path === 'home' || path === 'homeAndAway')) {
        count += match.awayTeamGoals;
      }
      if (match.awayTeam === idTeam && (path === 'away' || path === 'homeAndAway')) {
        count += match.homeTeamGoals;
      }
    });
    return count;
  }

  static goalsBalance(idTeam: number, allMatches: IMatch[], path: string) {
    let count = 0;
    allMatches.forEach((match) => {
      if (match.homeTeam === idTeam && (path === 'home' || path === 'homeAndAway')) {
        count += match.homeTeamGoals - match.awayTeamGoals;
      }
      if (match.awayTeam === idTeam && (path === 'away' || path === 'homeAndAway')) {
        count += match.awayTeamGoals - match.homeTeamGoals;
      }
    });
    return count;
  }

  static efficiency(idTeam: number, allMatches: IMatch[], path: string) {
    const totalPoints: number = this.totalPoints(idTeam, allMatches, path);
    const totalGames: number = this.totalGames(idTeam, allMatches, path);
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return Number(efficiency);
  }
}
