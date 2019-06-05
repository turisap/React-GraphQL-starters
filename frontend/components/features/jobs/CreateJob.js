import React from "react";
//import { Mutation } from "react-apollo";
//import gql from "graphql-tag";
//import { adopt } from "react-adopt";
import { Form } from "react-advanced-form";
import { CreateWithFilesUpload } from "../../abstractions/CreateWithFilesUpload";
//import DisplayError from "../../ErrorMessage";
//import Loading from "../../Loading";
import Input from "../../fields/Input";
//import validationMessages from "../../../lib/validationMessages";
//import validationRules from "../../../lib/validationRules";

// const CREATE_JOB_MUTATION = gql`
//   mutation CREATE_JOB_MUATION(
//     $tag: ID!
//     $title: String!
//     $level: Float!
//     $unit: String!
//     $image: String
//     $largeImage: String
//     $assignee: ID!
//   ) {
//     createJob(
//       tag: $tag
//       title: $title
//       level: $level
//       unit: $unit
//       image: $image
//       largeImage: $largeImage
//       assignee: $assignee
//     ) {
//       id
//       title
//     }
//   }
// `;

// const ALL_TAGS_OF_JOB_GROUP_QUERY = gql`
//   query ALL_TAGS_QUERY($jobGroup: String!) {
//     allTagsOfJobGroup(jobGroup: $jobGroup) {
//       id
//       title
//       jobGroup
//     }
//   }
// `;

/* eslint-disable */
// const Composed = adopt({
//   createJob: ({ render }) => <Mutation mutation={CREATE_JOB_MUTATION}>{render}</Mutation>,
//
// });
/* eslint-enable */

class CreateJob extends CreateWithFilesUpload {
  state = {
    tag: "",
    title: "",
    level: "",
    unit: "",
    image: "",
    largeImage: "",
    assignee: "",
    jobGroup: "",
    validForm: false
  };

  formIsValid = () => {
    const { tag, title, level, unit, image, assignee, jobGroup } = this.state;
    return tag && title && level && unit && image && assignee && jobGroup;
  };

  //TODO add assignees from project participants
  // TODO add form validation using react-advanced-form

  lol = ({ fields }) => {
    //console.log(fields);
    return new Promise((resolve, reject) => reject(fields));
  };

  render() {
    return (
      <Form action={this.lol}>
        <Input name="createJob__title" type="text" required />
        <button>Create</button>
      </Form>
    );
    // return (
    //   <Composed>
    //     {({ createJob }) => {
    //       return (
    //         <Form
    //           action={({serialized }) => console.log(serialized)}
    //           // action={() => {
    //           //   console.log('lolo')
    //           //   if (this.formIsValid()){
    //           //     this.resetState();
    //           //     createJob({ variables: this.state });
    //           //     return;
    //           //   }
    //           // }}
    //           className="createJob__form"
    //         >
    //             <label>
    //               Job Group
    //               <select
    //                 required
    //                 name="jobGroup"
    //                 value={this.state.jobGroup}
    //                 onChange={this.saveToState}
    //               >
    //                 <option value={null}>Select job group</option>
    //                 <option value="SURVEY">SURVEY</option>
    //                 <option value="FOUNDATION">FOUNDATION</option>
    //                 <option value="STRUCTURAL_STEEL">STRUCTURAL STEEL</option>
    //                 <option value="STRUCTURAL_CONCRETE">STRUCTURAL CONCRETE</option>
    //                 <option value="FITIN">FITIN</option>
    //                 <option value="PLUMBING">PLUMBING</option>
    //                 <option value="ELECTRICAL">ELECTRICAL</option>
    //                 <option value=" HANDOVER"> HANDOVER</option>
    //               </select>
    //             </label>
    //             <label>
    //               Title
    //               <InputL
    //                 required
    //                 type="text"
    //                 name="createJob__title"
    //                 value={this.state.title}
    //                 changeHandler={e => this.saveToState(e)}
    //               />
    //             </label>
    //             <label>
    //               Level
    //               <input
    //                 required
    //                 type="number"
    //                 name="level"
    //                 value={this.state.level}
    //                 onChange={this.saveToState}
    //               />
    //             </label>
    //             <label>
    //               Unit
    //               <input
    //                 required
    //                 type="text"
    //                 name="unit"
    //                 value={this.state.unit}
    //                 onChange={this.saveToState}
    //               />
    //             </label>
    //             {this.state.jobGroup &&
    //               <Query query={ALL_TAGS_OF_JOB_GROUP_QUERY} variables={{jobGroup : this.state.jobGroup }}>
    //                 {({ data, loading, error }) => {
    //                   if (error) return <DisplayError error={error}/>;
    //                   if(loading) return <Loading/>;
    //                   if(data.allTagsOfJobGroup.length)
    //                     return (
    //                       <label>
    //                         Tag
    //                       <select
    //                         required
    //                         name="tag"
    //                         value={this.state.tag}
    //                         onChange={this.saveToState}
    //                       >
    //                         <option value="" disabled selected>
    //                           Select a tag
    //                         </option>
    //                         {data.allTagsOfJobGroup.map(tag => (
    //                           <option value={tag.id}>{tag.title}</option>
    //                         ))}
    //                       </select>
    //                       </label>
    //                     )
    //                   return ""
    //                 }}
    //               </Query>
    //             }
    //             <label>
    //               Assignee
    //               <input
    //                 type="text"
    //                 name="assignee"
    //                 value={this.state.assignee}
    //                 onChange={this.saveToState}
    //               />
    //             </label>
    //             <label>
    //               Picture
    //               <input type="file" onChange={this.uploadFile} />
    //             </label>
    //           <button type="submit">Create</button>
    //         </Form>
    //       );
    //     }}
    //   </Composed>
    // );
  }
}

export default CreateJob;
