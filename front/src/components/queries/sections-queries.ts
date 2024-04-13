import { gql } from "../../__generated__";

export const CREATE_SECTION = gql(`
  mutation NewSection($section: NewSectionInput!) {
    newSection(section: $section) {
      id
      name
      description
      createdAt
      deleted
      isSxn
      slug
    }
  }
`);

export const EDIT_SECTION = gql(`
  mutation ESection($section: SectionInput!) {
    eSection(section: $section) {
      id
      name
      description
      createdAt
      deleted
      isSxn
      slug
    }
  }
`);

export const DEL_SECTION = gql(`
  mutation DSection($id: ID!) {
    dSection(id: $id) {
      id
    }
  }
`);

export const GET_SECTION = gql(`
  query Section($id: ID!) {
    section(id: $id) {
      id
      name
      description
      createdAt
      deleted
      isSxn
      slug
    }
  }
`);

export const GET_SECTIONS = gql(`
  query Sections($id: ID!) {
    sections {
      id
      name
      description
      createdAt
      deleted
      isSxn
      slug
    }
  }
`);
