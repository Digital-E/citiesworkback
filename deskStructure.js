import S from '@sanity/desk-tool/structure-builder'

import {
  GrDocumentText as FieldIcon,
  GrMultiple as DocumentIcon,
  GrTextAlignLeft as PostIcon,
  GrUser as AuthorIcon,
  GrArticle as ArticleIcon
} from 'react-icons/gr'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .icon(PostIcon)      
        .child(
            S.document()
            .title('Home')
            .id('home')
            .schemaType('home')
        ),
      S.listItem()
        .title('Projects')
        .icon(DocumentIcon)
        .child(
          S.documentList()
          .title('Project')
          .id('project')
          .filter('_type == "project"')
        ),       
      S.listItem()
        .title('About')
        .icon(PostIcon)      
        .child(
            S.document()
            .title('About')
            .id('about')
            .schemaType('about')
        ),                   
      S.listItem()
        .title('Menu')
        .icon(PostIcon)      
        .child(
            S.document()
            .title('Menu')
            .id('menu')
            .schemaType('menu')
        ),
      S.listItem()
        .title('Footer')
        .icon(PostIcon)      
        .child(
            S.document()
            .title('Footer')
            .id('footer')
            .schemaType('footer')
        ),
      S.listItem()
        .title('Legal')
        .icon(PostIcon)      
        .child(
            S.document()
            .title('Legal')
            .id('legal')
            .schemaType('legal')
        ),                             
    ])