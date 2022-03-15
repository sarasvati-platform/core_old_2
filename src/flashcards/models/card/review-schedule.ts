export class ReviewSchedule {
  /**
   * Initializes a new instance of the Schedule class.
   * @param due Card next review date.
   */
  constructor(
    public readonly due: Date,
  ) {}
}
