import React from "react";
import ExistingOccupations from "../../ExistingOccupations";
import { SaveToState } from "../../abstractions/SaveToState";

class AddParticipant extends SaveToState {
  render() {
    return (
      <fieldset disabled={false} aria-busy={false}>
        <ExistingOccupations />
      </fieldset>
    );
  }
}

export default AddParticipant;
